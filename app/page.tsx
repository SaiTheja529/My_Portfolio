import { About } from "@/components/main/about";
import { Contact } from "@/components/main/contact";
import { DevinTeaser } from "@/components/main/devin-teaser";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        <Skills />
        <Encryption />
        <Projects />
        <DevinTeaser />
        <Contact />
      </div>
    </main>
  );
}
