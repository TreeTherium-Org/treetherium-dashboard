import { Toaster } from 'react-hot-toast';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { JotaiProvider, ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@core/utils/class-names';
import NextProgress from '@core/components/next-progress';
import { useAuth } from '@/app/auth/useAuth'; // Adjust the import path based on your folder structure

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@/app/globals.css';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth(); // Get user information from the useAuth hook

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning className={cn(inter.variable, lexendDeca.variable, 'font-inter')}>
        <ThemeProvider>
          <NextProgress />
          <JotaiProvider>
            {children}
            <Toaster />
            <GlobalDrawer />
            <GlobalModal />
          </JotaiProvider>
          {/* Now you can use the user state in this component if needed */}
          {user && <p>Welcome, {user.email}</p>}
          {/* You can add more UI based on user role or authentication state */}
        </ThemeProvider>
      </body>
    </html>
  );
}
