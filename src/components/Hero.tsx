import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-notes.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-hero-gradient">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Your thoughts,
                <br />
                <span className="text-muted-foreground">organized</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                The simplest way to capture, organize, and find your notes.
                Clean, fast, and distraction-free.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-3 hover:cursor-pointer"
                onClick={() => navigate("/sign-in")}
              >
                Start Writing
              </Button>
              <Button
                variant="default"
                size="lg"
                className="text-base px-8 py-3 hover:cursor-pointer"
              >
                View Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-sm text-muted-foreground">
                <div className="font-semibold">Free to start</div>
                <div>No credit card required</div>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="font-semibold">Secure & Private</div>
                <div>Your notes stay yours</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative bg-white rounded-lg shadow-large p-8 border border-border">
              <img
                src={heroImage}
                alt="StarkNotes Interface"
                className="w-full h-auto rounded-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
