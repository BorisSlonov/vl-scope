import styles from "./page.module.css";
import LandingIntro from "@/components/Sections/LandingIntro";
import FeedbackForm from "@/components/FeedbackForm";
import LandEd from "@/components/Sections/LandEd";
import Faq from "@/components/Faq";
import TechInfo from "@/components/TechInfo";
import KitSubtract from "@/components/KitSubtract";

export default function Home() {
  return (
    <main className={styles.main}>
      <LandingIntro />
      <TechInfo />
      <KitSubtract />
      <LandEd />
      <Faq />
      <FeedbackForm />
    </main>
  );
}
