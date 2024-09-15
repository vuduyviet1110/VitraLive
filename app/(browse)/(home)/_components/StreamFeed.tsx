import { getStreams } from "@/lib/feed-service";
import StreamList from "./StreamList";

async function StreamFeed() {
  const streams = await getStreams();
  return (
    <div className="m-8">
      <h1 className="text-2xl font-semibold tracking-wide animate-pulse-1 mb-8">
        You may like
      </h1>
      {streams.length === 0 ? (
        <p>No streams</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {streams.map((stream) => (
            <StreamList key={stream.id} stream={stream} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StreamFeed;
