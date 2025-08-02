import { SignInForm } from "@/components/signin-form";

function SignIn() {
  return (
    <div className="grid items-center md:items-stretch p-0 md:grid-cols-2 min-h-svh">
      <div className="flex items-center">
        <SignInForm />
      </div>
      <div className="hidden md:block bg-black/3">
        <img src="" alt="Image" />
      </div>
    </div>
  );
}

export default SignIn;
