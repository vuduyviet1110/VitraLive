"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCreatorSidebarStore from "@/store/useCreatorSideBar";
import { User } from "@prisma/client";
import { Key, LucideView, MessageSquareCodeIcon, User2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Option {
  label: string;
  route: string;
  icon: LucideIcon;
}

function Options({ user }: { user: User }) {
  const { isCollapsed } = useCreatorSidebarStore();
  const createRouteConfig = (label: string, icon: LucideIcon): Option => ({
    label: label.toUpperCase(),
    route: `/u/${user.username}/${label.toLowerCase()}`,
    icon,
  });
  const currentRoute = usePathname();
  const options: Option[] = [
    createRouteConfig("Stream", LucideView),
    createRouteConfig("Key", Key),
    createRouteConfig("Chat", MessageSquareCodeIcon),
    createRouteConfig("Community", User2),
  ];

  return (
    <div className="m-3 text-gray-400">
      {isCollapsed ? (
        <div className="space-y-3 justify-between">
          {options.map((option) => (
            <div key={option.route}>
              <Button
                variant="ghost"
                className={cn(
                  "flex flex-col w-full h-full hover:scale-105 transition-all ease-linear",
                  currentRoute === option.route &&
                    "bg-slate-600 text-slate-100 "
                )}
              >
                <Link
                  className="flex justify-center w-full font-semibold"
                  href={option.route}
                >
                  <option.icon className="  w-5 h-5 " />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="text-muted-foreground text-lg font-semibold tracking-wide mb-3 ">
            Options
          </div>
          <div className="space-y-2">
            {options.map((option) => (
              <Button
                variant="ghost"
                key={option.route}
                className={cn(
                  "flex flex-col w-full h-full py-2 hover:bg-slate-600 hover:scale-105 transition-all ease-linear",
                  currentRoute === option.route &&
                    "bg-slate-600 text-slate-100 hover:text-slate-100"
                )}
              >
                <Link
                  className="flex justify-between w-full font-semibold"
                  href={option.route}
                >
                  <div key={option.route}>{option.label}</div>
                  <option.icon className="w-5 h-5" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Options;
