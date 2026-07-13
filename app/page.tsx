import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Framework from "@/components/Framework";
import LaborSites from "@/components/LaborSites";
import LaborTypes from "@/components/LaborTypes";
import LaborAllocation from "@/components/LaborAllocation";
import FlowDiagram from "@/components/FlowDiagram";
import Archive from "@/components/Archive";
import Conclusion from "@/components/Conclusion";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* drifting aurora, fixed behind all content */}
      <div className="bg-aurora" aria-hidden>
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
        <span className="a4" />
      </div>

      <NavBar />
      <main className="relative z-[2]">
        <Hero />
        <Framework />
        <LaborSites />
        <LaborTypes />
        <LaborAllocation />
        <FlowDiagram />
        <Archive />
        <Conclusion />
      </main>
      <Footer />
    </>
  );
}
