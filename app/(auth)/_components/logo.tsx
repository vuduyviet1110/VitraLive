import { Poppins } from "next/font/google";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
function Logo() {
  return (
    <div className="h-full flex flex-col items-center ">
      <Image
        src={logo}
        alt="logo"
        className="w-40 h-40 bg-slate-100 rounded-full"
      />
      <p className={cn("text-3xl font-semibold mt-4", font.className)}>
        Let&apos;s Live
      </p>
    </div>
  );
}

export default Logo;
