import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Experience } from "@/components/site/experience";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { Stats } from "@/components/site/stats";
import { Work } from "@/components/site/work";
import { earlier, experience } from "@/content/experience";
import { stats } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Stats stats={stats} />
        <Experience roles={experience} earlier={earlier} />
        <Work projects={projects} />
        <Contact />
      </main>
    </>
  );
}
