import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { LogOut } from "lucide-react";
import Link from "next/link";

async function ActionComponent() {
  return (
    <div>
      <Button className="hover:bg-red-800">
        <Link className="flex  px-2" href="/">
          <LogOut className="w-5 h-5 mr-2" />
          Exit
        </Link>
      </Button>
    </div>
  );
}

export default ActionComponent;
