import contact from "@/content/contact.json";
import experiments from "@/content/experiments.json";
import notes from "@/content/notes.json";
import questions from "@/content/questions.json";
import systems from "@/content/systems.json";
import { Contact } from "@/components/Contact";
import { Experiments } from "@/components/Experiments";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Navigation } from "@/components/Navigation";
import { Notes } from "@/components/Notes";
import { Questions } from "@/components/Questions";
import { Systems } from "@/components/Systems";
import type {
  ContactItem,
  Experiment,
  Note,
  Question,
  SystemNode
} from "@/lib/types";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Manifesto />
        <Questions questions={questions as Question[]} />
        <Experiments experiments={experiments as Experiment[]} />
        <Systems systems={systems as SystemNode[]} />
        <Notes notes={notes as Note[]} />
        <Contact items={contact as ContactItem[]} />
      </main>
    </>
  );
}
