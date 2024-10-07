"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchField() {
  const router = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const query = (form.query as HTMLInputElement).value.trim();

    if (!query) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Input name="query" placeholder="Search" className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      </div>
    </form>
  );
}
