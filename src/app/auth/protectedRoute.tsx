'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead
import { useAuth } from './useAuth'; // Custom hook to get current user and role

interface ProtectedRouteProps {
  children: ReactNode; // Define the type for children
  allowedRoles: string[]; // Define the type for allowedRoles as an array of strings
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const router = useRouter();
  const { user } = useAuth(); // Assuming this returns the current user and their role

  React.useEffect(() => {
    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      router.push('/access-denied'); // Redirect to an unauthorized page if access is denied
    }
  }, [user, allowedRoles, router]);

  return <>{user && user.role && allowedRoles.includes(user.role) ? children : null}</>;
};

export default ProtectedRoute;
