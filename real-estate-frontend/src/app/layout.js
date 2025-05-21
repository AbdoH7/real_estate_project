'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import Navbar from '@/components/layout/Navbar';
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

// Note: metadata needs to be in a separate layout.js file when using 'use client'
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.className}>
      <head>
        <title>Real Estate Listings</title>
        <meta name="description" content="Browse available apartments and properties" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
