import SignInForm from './sign-in-form';
import AuthWrapperThree from '@/app/shared/auth-layout/auth-wrapper-three';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign In 3'),
};

export default function SignIn() {
  return (
    <AuthWrapperThree
      title={
        <>
          <span className="block bg-gradient-to-r from-[#778B28] to-[#A3A830] bg-clip-text text-transparent">
            Welcome Back!
            </span>{' '}
          <span className="block text-[#4F3738] !text-[#4F3738] dark:text-[#4F3738]">Staff Login</span>
        </>
      }
      isSignIn
      isSocialLoginActive={true}
    >
      <SignInForm />
    </AuthWrapperThree>
  );
}
