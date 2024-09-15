import { getSelfByUserName } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import CreatorNavbar from "./_component/navbar";
import Sidebar from "./_component/sidebar";

interface Props {
  params: {
    username: string;
  };
  children: React.ReactNode;
}
const CreatorLayout = async ({ params, children }: Props) => {
  const self = await getSelfByUserName(params.username);
  if (!self) {
    redirect("/");
  }
  return (
    <div>
      <CreatorNavbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default CreatorLayout;
