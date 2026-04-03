import DiscordAnimation from "@/components/DiscordAnimation";
import DraggableChain from "@/components/DraggableChain";
import GithubContributionGraph from "@/components/GithubContributionGraph";
import HoverEffect from "@/components/HoverEffect";
import HoverPageComponent from "@/components/HoverPageComponent";
import LetterWave from "@/components/LetterWave";
import MacKeyboard from "@/components/MacKeyboard";
import NavBarScrollAnimation from "@/components/NavBarScrollAnimation";
import ScratchCard from "@/components/ScratchCard";
import SelectCardsAnimation from "@/components/SelectCardsAnimation";
import SpringCards from "@/components/SpringCards";
import TodoListAnimation from "@/components/TodoListAnimation";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      {/* <DiscordAnimation /> */}
      {/* <MacKeyboard /> */}
      {/* <SpringCards /> */}
      {/* <HoverEffect /> */}
      {/* <HoverPageComponent /> */}
      {/* <GithubContributionGraph /> */}
      {/* <SelectCardsAnimation /> */}
      {/* <DraggableChain /> */}
      {/* <ScratchCard /> */}
      {/* <LetterWave /> */}
      {/* <TodoListAnimation /> */}
      <NavBarScrollAnimation />
    </div>
  );
}
