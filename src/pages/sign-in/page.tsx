import { SignInForm } from "@/components/signin-form";
import frame from "../../assets/frame-medium.jpg";
import SEO from "@/components/seo";
import { useLocation } from "react-router-dom";

function SignIn() {
  const location = useLocation();

  return (
    <div className="grid items-center md:items-stretch p-0 md:grid-cols-2 min-h-svh">
      <SEO
        title="SignIn StarkNotes"
        description="StarkNotes SignUp page"
        url={`https://starknote.vercel.app${location.pathname}`}
      />
      <div className="flex items-center">
        <SignInForm />
      </div>
      <div className="hidden md:block bg-black/3">
        <img
          src={frame}
          alt="Image"
          className="h-full object-cover saturate-0"
        />
      </div>
    </div>
  );
}

export default SignIn;
