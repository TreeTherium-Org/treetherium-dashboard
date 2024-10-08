"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Use Next.js router for redirection
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Input, Text, Button, Password, Switch } from "rizzui";
import { useMedia } from "@/src/hooks/use-media";
import { Form } from "@/src/ui/form";
import { routes } from "@/config/routes";
import { loginSchema, LoginSchema } from "@/validators/login.schema";

// Import Firebase Auth and Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../firebase"; // Ensure the correct path to your Firebase config file

const initialValues: LoginSchema = {
  email: "admin@admin.com",
  password: "admin",
  rememberMe: true,
};

export default function SignInForm() {
  const isMedium = useMedia("(max-width: 1200px)", false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      // Firebase sign-in method
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      console.log("User signed in:", user);

      // Redirect to /ecommerce after successful sign-in
      router.push("/welcome");
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? "lg" : "xl"}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register("email")}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? "lg" : "xl"}
              className="[&>label>span]:font-medium"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between lg:pb-2">
              <Switch label="Remember Me" {...register("rememberMe")} />
              <Link
                href={routes.auth.forgotPassword3}
                className="h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>

            <Button
              className="w-full"
              type="submit"
              size={isMedium ? "lg" : "xl"}
            >
              Sign In
            </Button>
          </div>
        )}
      </Form>

      {/* Display error if sign-in fails */}
      {error && <p className="text-red-500">{error}</p>}

      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{" "}
        <Link
          href={routes.auth.signUp3}
          className="font-semibold text-gray-700 transition-colors hover:text-gray-1000"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
