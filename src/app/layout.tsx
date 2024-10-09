import { Toaster } from "react-hot-toast";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";
import { getServerSession } from "next-auth/next";
import { JotaiProvider, ThemeProvider } from "@/app/shared/theme-provider";
import { siteConfig } from "@/config/site.config";
import { inter, lexendDeca } from "@/app/fonts";
import cn from "@/src/utils/class-names";
import NextProgress from "@/src/components/next-progress";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"; // Adjust the import path based on your folder structure
import AuthProvider from "@/app/api/auth/[...nextauth]/auth-provider";


// styles
import "swiper/css";
import "swiper/css/navigation";
import "@/app/globals.css";

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Now use the session as needed; pass it down to components if necessary
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <AuthProvider session={session}>
          <ThemeProvider>
            <NextProgress />
            <JotaiProvider>
              {children}
              <Toaster />
              <GlobalDrawer />
              <GlobalModal />
            </JotaiProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
