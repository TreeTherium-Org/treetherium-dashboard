'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Title, Text } from 'rizzui';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import HandsTree from '@public/hands-tree.jpg';

export default function WelcomePage() {
  const [fadeOut, setFadeOut] = useState(false); // For controlling the fade-out effect
  const [hideSplash, setHideSplash] = useState(false); // For removing splash screen after fade-out
  const router = useRouter();

  useEffect(() => {
    // Start fade-out after 4 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 4000); // Start fading out after 4 seconds

    // Remove splash screen and navigate after 5 seconds (fade duration + 1 second)
    const removeSplashAndNavigate = setTimeout(() => {
      setHideSplash(true);
    }, 5000); // Completely hide after 5 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(removeSplashAndNavigate);
    };
  }, []);

  // Navigate to the dashboard when the splash screen is hidden
  useEffect(() => {
    if (hideSplash) {
      router.push(routes.eCommerce.dashboard); // Navigate to eCommerce dashboard after splash screen
    }
  }, [hideSplash, router]);

  // If splash is hidden, don't render anything
  if (hideSplash) {
    return null;
  }

  return (
    <div className={`splash-fade ${fadeOut ? 'hidden' : ''}`}>
      <div className="flex grow items-center px-6 xl:px-10">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-between text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
          <div>
            <Title
              as="h2"
              className="mb-3 text-[px] font-bold leading-snug sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
            >
              Welcome to Treetherium <br />
              Staff Dashboard.
            </Title>
            <Text className="mb-6 max-w-[612px] text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
              Together, let's make a change!
              <br className="hidden sm:inline-block lg:hidden" />
            </Text>
          </div>
          <div className="relative h-screen w-full flex justify-end">
            {/* Adjust the width of the Image container to fill the right side */}
            <div className="relative h-full w-1/2"> {/* Only right half of the screen */}
              <Image
                src={HandsTree}
                alt="coming-soon"
                layout="fill"
                objectFit="cover"
                className="z-0"
              />
              {/* Horizontal gradient overlay from white to transparent */}
              <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
