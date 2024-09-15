"use client";

import { useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MagnetIcon, SearchCheckIcon, SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchComponent = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          title: value,
        },
      },
      { skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex relative justify-between items-center text-muted-foreground"
    >
      <Input
        value={value}
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
        className="focus-visible:ring-transparent focus-visible:ring-offset-transparent"
      ></Input>
      {value && (
        <X
          className="absolute right-[66px] cursor-pointer "
          onClick={() => setValue("")}
        />
      )}
      <Button type="submit" className="bg-transparent">
        <SearchIcon className="text-muted-foreground bg-transparent"></SearchIcon>
      </Button>
    </form>
  );
};
export default SearchComponent;
