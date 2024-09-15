import { Button } from "@/components/ui/button";
import Container from "../_component/container";
import UrlCard from "./_components/UrlCard";
import KeyCard from "./_components/KeyCard";
import GetSef from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import ConnectModal from "./_components/connect-modal";

async function CreatorPage() {
  const currentUser = await GetSef();
  if (!currentUser) {
    return false;
  }
  const stream = await getStreamByUserId(currentUser?.id);
  if (!stream) {
    return false;
  }
  return (
    <Container>
      <div className="p-6 ">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-slate-100 tracking-wide text-2xl">
            Key & URLS
          </h1>
          <ConnectModal />
        </div>

        <div className="space-y-4">
          <UrlCard value={stream.serverUrl} />
          <KeyCard value={stream.streamKey} />
        </div>
      </div>
    </Container>
  );
}

export default CreatorPage;
