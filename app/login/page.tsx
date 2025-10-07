"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-semibold mb-6">Welcome Back</h1>

        {/* Your custom Google button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-zinc-500 text-white rounded hover:bg-zinc-600 transition flex items-center justify-center gap-4"
        >
          <FaGoogle /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
