import NavBar from "@/components/navbar";
import { cn } from "@/lib/utils";
function Home() {
  return (
    <div>
      <NavBar />
      <p className={cn("bg-[var(--test)]")}>welcome to our homepage</p>
    </div>
  );
}

export default Home;
