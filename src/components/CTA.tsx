import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to organize your thoughts?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of users who have already discovered the joy of
            organized note-taking with StarkNotes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-3 hover:cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Create Account
            </Button>
            <Button
              variant="default"
              size="lg"
              className="text-base px-8 py-3 hover:cursor-pointer"
            >
              Try Demo
            </Button>
          </div>

          <div className="pt-6 text-sm text-muted-foreground">
            <p>Free to start • No credit card required • Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
