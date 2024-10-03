import SignUpForm from './sign-up-form';
import AuthWrapperThree from '@/app/shared/auth-layout/auth-wrapper-three';//rendered and imported here
import { metaObject } from '@/config/site.config';
export const metadata = {
  ...metaObject('Sign Up 3'),
};

export default function SignUpPage() {
  return (
    <AuthWrapperThree
      title={
        <>
          <span className="bg-gradient-to-r from-[#2b3d1d] to-[#A3A830] bg-clip-text text-transparent">
            Join us today!
          </span>{' '}
          Staff Registration
        </>
      }
      isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapperThree>
  );
}
