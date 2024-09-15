import { Poppins } from "next/font/google";
import logo from "../../../../public/logo.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
function Logo() {
  return (
    <Link href={"/"} className=" lg:flex space-x-2 items-center ">
      <div className="bg-white rounded-full mr-2 ">
        <Image src={logo} alt="logo" height="32" width="32" />
      </div>
      <div className={cn(font.className, "hidden lg:block")}>
        <p className="text-lg font-semibold">MyStream</p>
        <p className="text-xs text-muted-foreground">let&apos;s live</p>
      </div>
    </Link>
  );
}

export default Logo;
