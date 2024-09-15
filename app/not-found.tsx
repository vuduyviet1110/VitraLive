"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, Turtle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NotFoundPage = () => {
  const [hoverDirection, setHoverDirection] = useState<"left" | "right">(
    "right"
  );
  const [hoverCount, setHoverCount] = useState(0);
  const lastMouseX = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentMouseX = e.clientX; // Only update hoverDirection if mouse movement is at least 2px
    if (
      lastMouseX.current !== null &&
      Math.abs(currentMouseX - lastMouseX.current) >= 6
    ) {
      if (currentMouseX > lastMouseX.current) {
        setHoverDirection("right");
        setHoverCount(hoverCount + 1);
      } else {
        setHoverDirection("left");
        setHoverCount(hoverCount + 1);
      }
    } // Update lastMouseX after handling

    lastMouseX.current = currentMouseX;
  };

  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-3xl">404 Not Found</h1>     
      <p>We couldn&apos;t find the Page you are looking for.</p>     
      <div
        className="relative group w-40 h-40 mt-32"
        onMouseMove={handleMouseMove}
      >
        <Turtle
          className={cn(
            "w-48 h-48 transition-transform",
            hoverDirection === "left" ? "scale-x-[-1]" : "scale-x-[1]"
          )}
        />
        {hoverCount > 20 ? (
          <span className="absolute text-slate-300 -top-6 left-12 w-full opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-700">
            Stop hovering around. I&apos;m so dizzy!
          </span>
        ) : (
          <span className="absolute text-slate-300 -top-6 left-12 w-full opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-700">
            I couldn&apos;t find anything!
          </span>
        )}

        <HelpCircle className="absolute text-rose-200 -top-4 left-0 w-10 h-10 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-700" />
      </div>
      <Button variant="outline" className="mt-8">
                <Link href="/">Go back home</Link>     
      </Button>
    </div>
  );
};

export default NotFoundPage;
