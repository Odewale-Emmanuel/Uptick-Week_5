import { SignUpForm } from "@/components/signup-form";
import note from "../../assets/notes.jpg";
import SEO from "@/components/seo";
import { useLocation } from "react-router-dom";

function SignUp() {
  const location = useLocation();

  return (
    <div className="grid items-center md:items-stretch p-0 md:grid-cols-2 min-h-svh">
      <SEO
        title="SignUp StarkNotes"
        description="StarkNotes SignIn page"
        url={`https://starknote.vercel.app${location.pathname}`}
      />

      <div className="flex items-center">
        <SignUpForm />
      </div>

      <div className="hidden md:block bg-black/3">
        <img
          src={note}
          alt="Image"
          className="h-full object-cover saturate-0"
        />
      </div>
    </div>
  );
}

export default SignUp;
