"use client";
import { redirect } from "next/navigation";
import ResultSearch from "./_components/results";
import { useSearchParams } from "next/navigation";
import Container from "../_components/container";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  if (!searchParams || !title) {
    redirect("/");
  }
  return (
    <main className="flex  max-w-screen-2xl min-h-screen mx-auto  text-white">
      <div className="p-8">
        <Container>
          <ResultSearch title={title} />
        </Container>
      </div>
    </main>
  );
};
export default SearchPage;
