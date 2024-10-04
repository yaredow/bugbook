import Image from "next/image";
import SigninImage from "@/assets/login-image.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "signin",
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          Signin form
        </div>
        <Image
          className="hidden w-1/2 object-cover md:block"
          src={SigninImage}
          alt="a photo of a group of people in an office"
        />
      </div>
    </div>
  );
}
