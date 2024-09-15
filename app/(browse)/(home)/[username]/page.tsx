import { getUserByUsername } from "@/lib/user-service";
import Container from "../../_components/container";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { CurrentUserisBlockedBy } from "@/lib/block-service";
import StreamPlayer from "@/components/stream/stream-player";

async function UserPage({ params }: { params: { username: string } }) {
  const VistingUser = await getUserByUsername(params.username);
  if (!VistingUser || !VistingUser.stream) {
    notFound();
  }
  const isCurrentUserFollowedVistedUser = await isFollowingUser(VistingUser.id);
  const isBlocked = await CurrentUserisBlockedBy(VistingUser.id);

  if (isBlocked) {
    notFound;
  }
  return (
    <main className="flex min-h-screen text-white">
      <Container>
        <StreamPlayer
          stream={VistingUser.stream}
          user={VistingUser}
          isFollowing={isCurrentUserFollowedVistedUser}
        />
      </Container>
    </main>
  );
}

export default UserPage;
