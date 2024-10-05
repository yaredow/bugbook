import SigninForm from "@/components/forms/signin-form";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SigninImage from "@/assets/login-image.jpg";

export const metadata: Metadata = {
  title: "signin",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Signin to bugbook</h1>
            <div className="space-y-5">
              <SigninForm />

              <Link
                className="block text-center hover:underline"
                href="/signup"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <Image
          className="hidden w-1/2 object-cover md:block"
          src={SigninImage}
          alt="a photo of a group of people in an office"
        />
      </div>
    </main>
  );
}
