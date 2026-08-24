import type { Metadata } from "next"
import { IBM_Plex_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { siteUrl } from "@/lib/site"
import "./globals.css"

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex",
})

const title = "Simple MCPs — remote tools for agents"
const description =
  "Small remote MCP servers with 2–5 tools. Catalog for humans and AI agents, hosted at brainiac.software."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title,
  description,
  authors: [{ name: "Dmytro Paduchak", url: "https://github.com/dmytropaduchak" }],
  keywords: [
    "MCP",
    "Model Context Protocol",
    "remote MCP",
    "AI agents",
    "brainiac",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/json": "/mcps.json",
      "text/plain": "/llms.txt",
    },
  },
  openGraph: {
    type: "website",
    title: "Simple MCPs",
    description,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Simple MCPs",
    description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plex.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    var scales = { small: "100%", medium: "112.5%", large: "125%" }
    var size = "small"
    var raw = localStorage.getItem("brainiac.software.appearance")
    if (raw) {
      var parsed = JSON.parse(raw)
      if (scales[parsed.uiSize]) size = parsed.uiSize
    }
    var root = document.documentElement
    root.dataset.uiSize = size
    root.style.fontSize = scales[size]
  } catch (e) {}
})()`,
          }}
        />
      </head>
      <body className="min-h-svh bg-background font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
