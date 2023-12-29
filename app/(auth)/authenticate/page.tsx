import { UserButton } from "@clerk/nextjs";

export default function Login() {
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
