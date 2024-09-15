import { currentUser } from "@clerk/nextjs/server";
import Container from "../_component/container";
import { getUserByUsername } from "@/lib/user-service";
import StreamPlayer from "@/components/stream/stream-player";
import { notFound } from "next/navigation";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

async function CreatorPage({ params }: CreatorPageProps) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id) {
    throw new Error("unauthorized");
  }
  if (!user.stream) {
    notFound();
  }
  return (
    <Container>
      <div className=" mt-4">
        <StreamPlayer stream={user.stream} user={user} isFollowing={true} />
      </div>
    </Container>
  );
}

export default CreatorPage;
