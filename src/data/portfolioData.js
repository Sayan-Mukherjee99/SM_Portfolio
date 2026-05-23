export const projectsData = [
  {
    id: "project-1",
    title: "Neeti AI",
    description: "An offline-first Android application designed with MVVM, Clean Architecture layers, Kotlin Coroutines, and Dependency Injection using Hilt.",
    techStack: ["Kotlin", "Jetpack Compose", "Android SDK", "Room Database", "Hilt"],
    imagePath: "/projects/android-arch.png",
    githubUrl: "https://github.com/Sayan-Mukherjee99/android-clean-arch",
    demoVideoUrl: "/projects/VID-20260411-WA0014.mp4",
    technicalChallenge: "Faced severe memory leaks during nested state restoration. Solved by decoupling Compose state hoisting from the ViewModel lifecycle, achieving zero leakage."
  },
  {
    id: "project-2",
    title: "Codalyte",
    description: "A lightweight, real-time code execution and collaborative editor platform featuring low-latency synchronizations and inline AST diagnostics.",
    techStack: ["React", "Next.js", "WebSockets", "Node.js", "Monaco Editor"],
    imagePath: "/projects/codalyte.png",
    githubUrl: "https://github.com/Sayan-Mukherjee99/codalyte",
    demoVideoUrl: "/projects/Codalyte.mov",
    technicalChallenge: "Encountered performance bottlenecks during real-time AST parsing. Resolved by offloading syntax analysis to Web Workers, reducing main thread blockages by 85%."
  },
  {
    id: "project-3",
    title: "HealthTrack+",
    description: "A modern, high-performance mobile health tracking dashboard designed to aggregate and visualize daily steps, heart rates, workouts, and calories in real time.",
    techStack: ["Kotlin", "Jetpack Compose", "Android SDK", "Room Database", "Hilt"],
    imagePath: "/projects/health-tracker.png",
    githubUrl: "https://github.com/Sayan-Mukherjee99/health-tracker",
    demoVideoUrl: "https://www.healthtrack.store/",
    technicalChallenge: "Encountered high battery drain and database lockups during real-time sensor polling. Solved by implementing dynamic batching queues and concurrent Room writes with Kotlin Flow."
  },
  {
    id: "project-4",
    title: "Study Flow",
    description: "A modern, high-productivity task manager and study companion that tracks focus sessions, visualizes subject goals, and manages dynamic daily tasks.",
    techStack: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "LocalStorage"],
    imagePath: "/projects/study-flow.png",
    githubUrl: "https://github.com/Sayan-Mukherjee99/study-flow",
    demoVideoUrl: "/projects/Study Flow.mp4",
    technicalChallenge: "Faced interface stutter during high-resolution calendar renders. Solved by virtualizing task nodes and throttling the active Pomodoro session state updates to 1Hz."
  }
];

export const certificatesData = [
  {
    id: "cert-1",
    title: "Technical Certification 01",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084155.png"
  },
  {
    id: "cert-2",
    title: "Technical Certification 02",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084302.png"
  },
  {
    id: "cert-3",
    title: "Technical Certification 03",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084352.png"
  },
  {
    id: "cert-4",
    title: "Technical Certification 04",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084413.png"
  },
  {
    id: "cert-5",
    title: "Technical Certification 05",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084446.png"
  },
  {
    id: "cert-6",
    title: "Technical Certification 06",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084508.png"
  },
  {
    id: "cert-7",
    title: "Technical Certification 07",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084527.png"
  },
  {
    id: "cert-8",
    title: "Technical Certification 08",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084740.png"
  },
  {
    id: "cert-9",
    title: "Technical Certification 09",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084816.png"
  },
  {
    id: "cert-10",
    title: "Technical Certification 10",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 084952.png"
  },
  {
    id: "cert-11",
    title: "Technical Certification 11",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 194856.png"
  },
  {
    id: "cert-12",
    title: "Technical Certification 12",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 195011.png"
  },
  {
    id: "cert-13",
    title: "Technical Certification 13",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 195042.png"
  },
  {
    id: "cert-14",
    title: "Technical Certification 14",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 195116.png"
  },
  {
    id: "cert-15",
    title: "Technical Certification 15",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 195441.png"
  },
  {
    id: "cert-16",
    title: "Technical Certification 16",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 195528.png"
  },
  {
    id: "cert-17",
    title: "Technical Certification 17",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 195606.png"
  },
  {
    id: "cert-18",
    title: "Technical Certification 18",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 195644.png"
  },
  {
    id: "cert-19",
    title: "Technical Certification 19",
    issuer: "Verified Registry",
    verificationUrl: "/certificates/Screenshot 2026-05-21 195717.png"
  }
];
