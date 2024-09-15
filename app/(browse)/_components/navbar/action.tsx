import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

async function ActionComponent() {
  const user = await currentUser();
  return (
    <div>
      {!user && (
        <div className="space-x-8 text-lg  lg:space-x-4">
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      )}

      {!!user && (
        <div className="space-x-8 lg:space-x-4 z-99999 ">
          <Button className="bg-transparent">
            <Link
              className="text-muted-foreground flex space-x-2 items-center "
              href={`/u/${user.username}/stream`}
            >
              <Clapperboard className="w-6 h-6 bg-transparent" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default ActionComponent;
