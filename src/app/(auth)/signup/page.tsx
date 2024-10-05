import Image from "next/image";
import SignupImage from "@/assets/signup-image.jpg";
import Link from "next/link";
import SignupForm from "@/components/forms/signup-form";

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Signup to bugbook</h1>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> find a
              friend
            </p>
            <div className="space-y-5">
              <SignupForm />

              <Link
                className="block text-center hover:underline"
                href="/signin"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
        <Image
          className="hidden w-1/2 object-cover md:block"
          src={SignupImage}
          alt="a photo of a group of people in an office"
        />
      </div>
    </main>
  );
}
