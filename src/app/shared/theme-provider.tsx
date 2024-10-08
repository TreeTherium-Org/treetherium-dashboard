"use client";

import { Provider } from "jotai";
import { siteConfig } from "@/config/site.config";
import hideRechartsConsoleError from "@/src/utils/recharts-console-error";
import { ThemeProvider as NextThemeProvider } from "next-themes";

hideRechartsConsoleError();

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={String(siteConfig.mode)}
    >
      {children}
    </NextThemeProvider>
  );
}

export function JotaiProvider({ children }: React.PropsWithChildren<{}>) {
  return <Provider>{children}</Provider>;
}
