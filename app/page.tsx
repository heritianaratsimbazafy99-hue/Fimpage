import { LandingPage } from "@/components/landing-page";
import { sessions } from "@/data/sessions";

export default function Home() {
  return <LandingPage sessions={sessions} />;
}
