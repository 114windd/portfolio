import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Experience } from "@/components/site/experience";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Nav } from "@/components/site/nav";
import { Skills } from "@/components/site/skills";
import { Stats } from "@/components/site/stats";
import { Work } from "@/components/site/work";
import { earlier, experience } from "@/content/experience";
import { marquee, skills, stats } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee items={marquee} />
        <About />
        <Stats stats={stats} />
        <Work projects={projects} />
        <Experience roles={experience} earlier={earlier} />
        <Skills groups={skills} />
        <Contact />
      </main>
    </>
  );
}
