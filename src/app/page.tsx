import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";


export default function Home() {


  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors">
      <Header />

      <LandingPage />
      
    </div>
  );
}
