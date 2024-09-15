import Container from "../_components/container";
import StreamFeed from "./_components/StreamFeed";

export default function Home() {
  return (
    <main className="flex max-w-screen-2xl min-h-screen mx-auto  text-white">
      <Container>
        <StreamFeed />
      </Container>
    </main>
  );
}
