import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SigninData, SigninSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { signin } from "@/app/(auth)/action";
import { Input } from "../ui/input";

export default function SigninForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SigninData>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: SigninData) => {
    setError("");
    startTransition(async () => {
      await signin(values).then((error) => {
        if (error) setError(error);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="item-start flex flex-col justify-start">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="item-start flex flex-col justify-start">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
