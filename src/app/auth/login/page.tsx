import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <form className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}