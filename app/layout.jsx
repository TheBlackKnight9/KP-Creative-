import { Bricolage_Grotesque, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "KP Creatives — We Build Digital Presences That Actually Work",
  description:
    "Websites, brands, and campaigns for businesses ready to grow. KP Creatives is a Delhi NCR digital agency specialising in web design, branding, and performance marketing.",
  keywords: [
    "digital agency",
    "web design",
    "branding",
    "Delhi NCR",
    "KP Creatives",
    "website development",
  ],
  openGraph: {
    title: "KP Creatives — Digital Agency",
    description:
      "Websites, brands, and campaigns for businesses ready to grow — not just look good.",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jakarta.variable} ${dmMono.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
