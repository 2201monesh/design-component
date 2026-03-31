import DiscordAnimation from "@/components/DiscordAnimation";
import GithubContributionGraph from "@/components/GithubContributionGraph";
import HoverEffect from "@/components/HoverEffect";
import HoverPageComponent from "@/components/HoverPageComponent";
import MacKeyboard from "@/components/MacKeyboard";
import SelectCardsAnimation from "@/components/SelectCardsAnimation";
import SpringCards from "@/components/SpringCards";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      {/* <DiscordAnimation /> */}
      {/* <MacKeyboard /> */}
      {/* <SpringCards /> */}
      {/* <HoverEffect /> */}
      {/* <HoverPageComponent /> */}
      {/* <GithubContributionGraph /> */}
      <SelectCardsAnimation />
    </div>
  );
}
