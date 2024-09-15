"use client";
import { Button } from "@/components/ui/button";
import { ShieldQuestion } from "lucide-react";
import Link from "next/link";

const ErroPage = () => {
  return (
    <div className="h-full flex mt-32 flex-col space-y-4 items-center justify-center text-muted-foreground">
      <ShieldQuestion className="w-16 h-16 text-rose-300" />
      <h1 className="text-3xl">Error!</h1>
      <p>Something went wrong. Please try again.</p>
      <Button variant="outline">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default ErroPage;
