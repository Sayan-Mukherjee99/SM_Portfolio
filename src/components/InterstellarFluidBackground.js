'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec2, RenderTarget, Color } from 'ogl';

// ----------------------------------------------------------------------
// SHADER: SIMULATION (Physics)
// ----------------------------------------------------------------------
const simFragment = /* glsl */ `
    precision highp float;
    
    uniform sampler2D uTexture; // Previous frame
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseActive;
    uniform vec2 uResolution;
    uniform float uAspect;
    uniform float uDissipation;
    uniform vec3 uBaseColor;
    uniform vec3 uGlowColor;
    
    varying vec2 vUv;

    // --- CURL NOISE (The Turbulence) ---
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    vec2 curl(vec2 p) {
        float eps = 0.001;
        float n1, n2, a, b;
        n1 = snoise(p + vec2(0, eps));
        n2 = snoise(p - vec2(0, eps));
        a = (n1 - n2) / (2.0 * eps);
        n1 = snoise(p + vec2(eps, 0));
        n2 = snoise(p - vec2(eps, 0));
        b = (n1 - n2) / (2.0 * eps);
        return vec2(a, -b);
    }

    void main() {
        vec2 uv = vUv;
        
        // 1. Advection (Move the gas)
        // Large scale curl noise for "Cosmic" feel
        vec2 flow = curl(uv * 1.8 + uTime * 0.03);
        
        // Move pixels along the flow
        vec2 newUv = uv - flow * 0.0025; 
        
        // Slight "Zoom Out" to prevent border artifacts
        newUv -= 0.5;
        newUv *= 0.996; 
        newUv += 0.5;
        
        vec4 advected = texture2D(uTexture, newUv);
        
        // 2. Mouse Injection (Thrust)
        vec2 mouse = uMouse;
        mouse.x *= uAspect;
        vec2 curUv = uv;
        curUv.x *= uAspect;
        
        float dist = length(curUv - mouse);
        // Sharp brush for star-like injection
        float brush = smoothstep(0.06, 0.0, dist) * uMouseActive;
        
        // Inject glowing color mixed with white hot core
        vec3 injectColor = mix(uGlowColor, vec3(1.0), 0.3) * brush * 3.5;
        
        // 3. Composition
        vec3 finalColor = advected.rgb + injectColor;
        
        // 4. Decay (Vacuum of space)
        finalColor *= uDissipation;

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

// ----------------------------------------------------------------------
// SHADER: DISPLAY (Color Grading)
// ----------------------------------------------------------------------
const displayFragment = /* glsl */ `
    precision highp float;
    uniform sampler2D uTexture;
    varying vec2 vUv;
    uniform vec3 uBaseColor;

    void main() {
        vec4 color = texture2D(uTexture, vUv);
        
        vec3 c = color.rgb;
        
        // Add the base tint (Ambient starlight/space void)
        c += uBaseColor * 0.15;
        
        // Gamma correction for contrast
        c = pow(c, vec3(1.3)); 
        
        // Dithering (prevents banding in dark gradients)
        float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
        c += noise * 0.015;

        gl_FragColor = vec4(c, 1.0);
    }
`;

export default function InterstellarFluidBackground({
  baseColor = [0.02, 0.02, 0.04],  // Very deep cyber space blue
  glowColor = [0.65, 0.1, 1.0],   // Neon Purple/Violet
  dissipation = 0.982,            // Lingering trailing fluid effect
  interactive = true,
}) {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Setup Renderer
    const renderer = new Renderer({
      alpha: false,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;

    // Enable Floating Point Textures
    const ext = gl.getExtension('OES_texture_float');
    const extLinear = gl.getExtension('OES_texture_float_linear');

    const geometry = new Triangle(gl);

    // Programs
    const simProgram = new Program(gl, {
      vertex: `attribute vec2 uv; attribute vec2 position; varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }`,
      fragment: simFragment,
      uniforms: {
        uTexture: { value: null },
        uTime: { value: 0 },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uMouseActive: { value: 0 },
        uResolution: { value: new Vec2(0, 0) },
        uAspect: { value: 1 },
        uDissipation: { value: dissipation },
        uBaseColor: { value: new Color(baseColor) },
        uGlowColor: { value: new Color(glowColor) },
      },
    });

    const displayProgram = new Program(gl, {
      vertex: `attribute vec2 uv; attribute vec2 position; varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }`,
      fragment: displayFragment,
      uniforms: {
        uTexture: { value: null },
        uBaseColor: { value: new Color(baseColor) },
      },
    });

    const simMesh = new Mesh(gl, { geometry, program: simProgram });
    const displayMesh = new Mesh(gl, { geometry, program: displayProgram });

    // FBOs (Double Buffering)
    const fboArgs = {
      width: window.innerWidth >> 1, // Half-res for soft organic looks and high performance
      height: window.innerHeight >> 1,
      type: gl.HALF_FLOAT || gl.FLOAT,
      internalFormat: gl.RGBA16F || gl.RGBA,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    };
    let fboRead = new RenderTarget(gl, fboArgs);
    let fboWrite = new RenderTarget(gl, fboArgs);

    // Input Handling
    const mouse = new Vec2(0.5, 0.5);
    const targetMouse = new Vec2(0.5, 0.5);
    let isMoving = 0;

    function resize() {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);

      // Resize FBOs
      const fboW = w >> 1;
      const fboH = h >> 1;
      fboRead.setSize(fboW, fboH);
      fboWrite.setSize(fboW, fboH);

      simProgram.uniforms.uResolution.value.set(w, h);
      simProgram.uniforms.uAspect.value = w / h;
    }
    window.addEventListener('resize', resize);
    resize();

    function updateMouse(x, y) {
      targetMouse.set(x / window.innerWidth, 1.0 - y / window.innerHeight);
      isMoving = 1.0;
    }

    const onMouseMove = (e) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    if (interactive) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
    }

    let animationId;
    function update(t) {
      animationId = requestAnimationFrame(update);
      const time = t * 0.001;

      // Smooth Mouse Lerp
      mouse.lerp(targetMouse, 0.12);

      // Mouse activity decay
      if (Math.abs(mouse.x - targetMouse.x) < 0.0005) {
        isMoving *= 0.94;
      }

      // Update Uniforms
      simProgram.uniforms.uTime.value = time;
      simProgram.uniforms.uMouse.value.copy(mouse);
      simProgram.uniforms.uMouseActive.value = isMoving;
      simProgram.uniforms.uTexture.value = fboRead.texture;
      simProgram.uniforms.uDissipation.value = dissipation;

      // Ping-Pong Rendering
      renderer.render({ scene: simMesh, target: fboWrite });
      displayProgram.uniforms.uTexture.value = fboWrite.texture;
      renderer.render({ scene: displayMesh });

      // Swap
      const temp = fboRead;
      fboRead = fboWrite;
      fboWrite = temp;
    }
    animationId = requestAnimationFrame(update);
    container.appendChild(gl.canvas);
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove', onTouchMove);
      }
      if (container && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseColor, glowColor, dissipation, interactive]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 -z-20 w-full h-full pointer-events-none transition-opacity duration-1000 ease-out bg-[#020204] ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
