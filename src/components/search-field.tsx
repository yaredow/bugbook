import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchField() {
  const handleSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
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
