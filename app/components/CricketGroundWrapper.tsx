// components/CricketGroundWrapper.tsx
"use client";
import dynamic from "next/dynamic";

const CricketGround = dynamic(
  () => import("./CricketGround"),
  { 
    ssr: false,
    loading: () => <div className="h-[700px] w-[1000px] bg-gray-100 rounded-lg animate-pulse" />
  }
);

export default CricketGround;