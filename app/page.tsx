import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Consequences } from "@/components/sections/Consequences";
import { Calculator } from "@/components/sections/Calculator";
import { Platform } from "@/components/sections/Platform";
import { Dashboard } from "@/components/sections/Dashboard";
import { Reputation } from "@/components/sections/Reputation";
import { Audit } from "@/components/sections/Audit";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Consequences />
        <Calculator />
        <Platform />
        <Dashboard />
        <Reputation />
        <Audit />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
