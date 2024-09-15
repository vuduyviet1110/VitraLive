import { getBlockedUsers } from "@/lib/block-service";
import Container from "../_component/container";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/dataTable";
import { format } from "date-fns";

async function CommunityPage() {
  const blockedUsers = await getBlockedUsers();
  const formattedUsers = blockedUsers.map((user) => ({
    ...user,
    userId: user.Blocked.id,
    imageUrl: user.Blocked.imageUrl,
    username: user.Blocked.username,
    createdAt: format(new Date(user.Blocked.createdAt), "yyyy-MM-dd"),
  }));
  return (
    <Container>
      <div className="p-6 bg-slate-500">
        <h1 className="font-bold text-slate-100 mb-8 tracking-wide text-2xl">
          Community Details
        </h1>
        <div className="">
          <DataTable columns={columns} data={formattedUsers} />
        </div>
      </div>
    </Container>
  );
}

export default CommunityPage;
