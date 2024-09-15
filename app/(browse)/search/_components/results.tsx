import { getSearch } from "@/lib/search-service";
import ResultCard from "./resultCard";

const ResultSearch = async ({ title }: { title: string }) => {
  const data = await getSearch(title);
  return (
    <div>
      <div className="text-2xl text-slate-300 font-bold mb-8">
        Result for{" "}
        <span className="text-destructive animate-pulse-1">
          &quot;{title}&quot;
        </span>
        :
      </div>
      {data.length === 0 && (
        <p className="text-md text-muted-foreground">
          No results found. Try searching for something else.
        </p>
      )}
      {data.length > 0 && (
        <div className="flex  flex-wrap gap-4">
          {data.map((d, index) => (
            <ResultCard key={d.id} data={d} />
          ))}
        </div>
      )}
    </div>
  );
};
export default ResultSearch;
