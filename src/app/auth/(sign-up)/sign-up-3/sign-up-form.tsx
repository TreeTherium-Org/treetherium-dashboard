"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"; // Import from react-hook-form
import { Password, Switch, Button, Input, Text } from "rizzui";
import { useMedia } from "@/src/hooks/use-media";
import { routes } from "@/config/routes";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../../firebase"; // Ensure this is correctly initialized

const initialValues = {
  email: "",
  password: "",
  isAgreed: false,
  role: "admin",
};

export default function SignUpForm() {
  const isMedium = useMedia("(max-width: 1200px)", false);
  const [reset, setReset] = useState({});
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<typeof initialValues> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      // Create staff collection in firestore
      await setDoc(doc(db, "staff", user.uid), {
        email: data.email,
        createdAt: new Date(),
        isAgreed: data.isAgreed,
        role: data.role,
      });

      setReset({ ...initialValues, isAgreed: false });
      router.push(routes.auth.signIn3);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error registering:", error.message);
        alert("Register failed: " + error.message);
      } else {
        console.error("Unknown error", error);
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 lg:space-y-6"
      >
        <Input
          type="email"
          size={isMedium ? "lg" : "xl"}
          label="Email"
          placeholder="Enter your email"
          className="[&>label>span]:font-medium text-[#4F3738]"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Password
          label="Password"
          placeholder="Enter your password"
          size={isMedium ? "lg" : "xl"}
          className="[&>label>span]:font-medium text-[#4F3738]"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        <div className="col-span-2 flex items-start pb-1 text-[#4F3738]">
          <Switch
            {...register("isAgreed", { required: "Agreement is required" })}
            className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium"
            label={
              <Text className="ps-1 text-[#4F3738]">
                By registering you have agreed to our{" "}
                <Link
                  href="/"
                  className="font-semibold text-[#4F3738] transition-colors hover:text-primary"
                >
                  Terms
                </Link>{" "}
                &{" "}
                <Link
                  href="/"
                  className="font-semibold text-[#4F3738] transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </Text>
            }
          />
        </div>
        <Button className="w-full" type="submit" size={isMedium ? "lg" : "xl"}>
          Create Account
        </Button>
      </form>

      <Text className="mt-5 text-center text-[15px] leading-loose text-[#4F3738] md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to register?{" "}
        <Link
          href={routes.auth.signIn3}
          className="font-semibold text-[#4F3738] transition-colors hover:text-[#4F3738]"
        >
          Login
        </Link>
      </Text>
    </>
  );
}
