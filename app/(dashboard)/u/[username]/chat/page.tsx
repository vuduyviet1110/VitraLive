import GetSef from "@/lib/auth-service";
import Container from "../_component/container";
import { getStreamByUserId } from "@/lib/stream-service";
import ToggleCard from "./_components/ToggleCard";

async function CreatorPage() {
  const currentUser = await GetSef();
  if (!currentUser) return null;
  const stream = await getStreamByUserId(currentUser.id);
  if (!stream) throw new Error("Stream not found");
  return (
    <Container>
      <div className="p-6">
        <h1 className="font-bold text-slate-100 tracking-wide text-2xl">
          Settings
        </h1>
        <div className="space-y-3">
          <ToggleCard
            field="isEnabledChat"
            label="Enable Chat"
            IsTurningOn={stream.isEnabledChat}
          />
          <ToggleCard
            field="isDelayChat"
            label="Delay Chat"
            IsTurningOn={stream.isDelayChat}
          />
          <ToggleCard
            field="isOnlyFollowerOnly"
            label="Must be follower to see Stream"
            IsTurningOn={stream.isOnlyFollowerOnly}
          />
        </div>
      </div>
    </Container>
  );
}

export default CreatorPage;
