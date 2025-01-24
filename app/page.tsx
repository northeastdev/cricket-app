// app/page.tsx
import CricketGroundWrapper from "@/components/CricketGroundWrapper";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Cricket Field Editor
      </h1>
      <CricketGroundWrapper />
    </main>
  );
}