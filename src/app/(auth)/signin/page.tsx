import { Form, FormField } from "@/components/ui/form";
import { SigninData, SigninSchema } from "@/lib/validation";
import { Metadata } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const metadata: Metadata = {
  title: "signin",
};

export default function Page() {
  return <div>signin</div>;
}
