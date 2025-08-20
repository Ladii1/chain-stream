"use client"
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";

import { CreateContent } from "@/components/CreateContent";
import { useState } from "react";
import { Content } from "@/types";

export default function Home() {

  const [contents, setContents] = useState<Content[]>([]);
  

  const handleCreateContent = async (contentData: any) => {
    
    const newContent: Content = {
      id: Date.now().toString(),
      ...contentData,
      tokenId: `nft_${Date.now()}`,
      transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
      upvotes: 0,
      tips: 0,
      createdAt: new Date(),
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <Header />

      <LandingPage />

      <div className="border-t">
        {/**test */}
        <CreateContent onSubmit={handleCreateContent} />
      </div>
      
    </div>
  );
}
