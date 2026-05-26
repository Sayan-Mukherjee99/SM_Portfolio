import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans-fallback",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono-fallback",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Sayan Mukherjee // Developer Portfolio // Android & Web Systems",
  description: "Professional developer portfolio website detailing native mobile architectures, clean MVVM/Kotlin development, and high-performance async JavaScript engines.",
  keywords: ["Sayan Mukherjee", "Kotlin", "Android", "Jetpack Compose", "React", "Next.js", "Tailwind CSS", "Developer Portfolio"],
  authors: [{ name: "Sayan Mukherjee" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen bg-[#FDFBF7] text-black selection:bg-[#FFDC58]">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('splashShown') === 'true') {
                  document.documentElement.classList.add('splash-hidden');
                }
              } catch (e) {}
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
