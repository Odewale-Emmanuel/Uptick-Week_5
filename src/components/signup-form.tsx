import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { nameRegEx, emailRegEx, passwordRegEx } from "@/utils/regex";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [firstNameCheck, setFirstNameCheck] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>("");
  const [lastNameCheck, setLastNameCheck] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordCheck, setConfirmPasswordCheck] =
    useState<boolean>(false);
  const navigator = useNavigate();

  function handleFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstNameCheck(nameRegEx.test(e.target.value));
    setFirstName(e.target.value);
  }

  function handleLastName(e: React.ChangeEvent<HTMLInputElement>) {
    setLastNameCheck(nameRegEx.test(e.target.value));
    setLastName(e.target.value);
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailCheck(emailRegEx.test(e.target.value));
    setEmail(e.target.value);
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheck(passwordRegEx.test(e.target.value));
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPasswordCheck(passwordRegEx.test(e.target.value));
    setConfirmPassword(e.target.value);
  }

  async function handleSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const passwordIsSame = password === confirmPassword;

    if (!firstNameCheck || !lastNameCheck) {
      toast.error(
        "Invalid name: name cannot be empty or cannot contain space, numbers or special characters"
      );
      return;
    }

    if (!emailCheck) {
      toast.error("Invalid email: please insert a valid email address");
      return;
    }

    if (password === email) {
      toast.error("Your password can't be same as your email");
      return;
    }

    if (!passwordCheck) {
      toast.error(
        "Invalid password: password cannot be empty and password must contain a sepcial character, a number, a lower and uppercase letter"
      );
      return;
    }

    if (!passwordIsSame) {
      toast.error("Passwords must be same");
      return;
    }

    if (
      firstNameCheck &&
      lastNameCheck &&
      passwordCheck &&
      confirmPasswordCheck &&
      passwordIsSame
    ) {
      setLoading(true);

      try {
        const response = await axios.post(
          "https://uptick-week-4.onrender.com/api/sign-up",
          {
            name: `${firstName} ${lastName}`,
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!(response.status == 201)) {
          throw new Error("Failed to create user");
        }
        if (response.status == 201) {
          setLoading(false);
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setConfirmPassword("");
          toast.success("account created successfully", {});
          toast("redirecting to sign-in page now");
          setTimeout(() => {
            navigator("/sign-in");
          }, 8000);
        }
      } catch (error: unknown) {
        setLoading(false);
        toast.error("an error occured while signing you up");
        throw error;
      }
    }
  }

  return (
    <form
      className={cn(
        "flex flex-col gap-6 p-6 md:p-8 max-w-[450px] w-full mx-auto",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-start md:items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your info below to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-3">
            <Label htmlFor="firstname">Firstname</Label>
            <Input
              className={cn(
                firstNameCheck
                  ? "focus-visible:ring-ring/50"
                  : "focus-visible:ring-red-600"
              )}
              id="firstname"
              type="text"
              onChange={handleFirstName}
              placeholder="firstname"
              minLength={2}
              maxLength={50}
              value={firstName}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastname">Lastname</Label>
            <Input
              className={cn(
                lastNameCheck
                  ? "focus-visible:ring-ring/50"
                  : "focus-visible:ring-red-600"
              )}
              id="lastname"
              type="text"
              onChange={handleLastName}
              placeholder="lastname"
              minLength={2}
              maxLength={50}
              value={lastName}
              required
            />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input
            className={cn(
              emailCheck
                ? "focus-visible:ring-ring/50"
                : "focus-visible:ring-red-600"
            )}
            id="email"
            type="email"
            placeholder="johndoe@mail.com"
            value={email}
            onChange={handleEmail}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            className={cn(
              passwordCheck
                ? "focus-visible:ring-ring/50"
                : "focus-visible:ring-red-600"
            )}
            id="password"
            type="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          </div>
          <Input
            className={cn(
              confirmPasswordCheck
                ? "focus-visible:ring-ring/50"
                : "focus-visible:ring-red-600"
            )}
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={(e) => handleSignUp(e)}
          disabled={loading}
        >
          {loading ? <LoaderIcon className="animate-spin" /> : "Sign Up"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/sign-in" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </form>
  );
}
