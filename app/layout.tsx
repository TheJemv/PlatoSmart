import type { Metadata } from 'next'
import { Cormorant_Garamond, Poppins } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-serif',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PlatoSmart - Delicious Recipes for Every Occasion',
  description: 'Discover amazing recipes, cooking tips, and culinary inspiration at PlatoSmart. Your ultimate destination for delicious homemade meals.',
  generator: 'platosmart.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>

      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
