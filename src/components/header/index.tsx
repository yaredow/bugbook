import Link from "next/link";
import SearchField from "../search-field";
import UserButton from "../user-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link className="px-4 text-2xl font-bold text-primary" href="/">
          bugbook
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
