"use client";
import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { AutoConnectProvider } from "@/components/auto-connect-provider";
import { WalletProvider } from "@/components/wallet-provider";
import { Toaster } from "@/components/ui/toaster";
import client from "../lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import React from "react";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>{siteConfig.name}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Mint your NFT rewards!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
          <ApolloProvider client={client}>
            <AutoConnectProvider>
              <WalletProvider>
                <Providers
                  themeProps={{ attribute: "class", defaultTheme: "dark" }}
                >
                  <div className="relative flex flex-col h-screen">
                    {children}
                  </div>
                </Providers>
                <Toaster />
              </WalletProvider>
            </AutoConnectProvider>
          </ApolloProvider>
      </body>
    </html>
  );
}
