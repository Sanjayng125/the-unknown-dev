"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.error) {
        router.replace("/");
      } else if (res.error.includes("Credentials")) {
        setError("Invalid email or password/You are not allowed to login!");
      }
    } catch (error) {
      setError("Something went wrong. Try again!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-5">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Sign In
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Email</span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-300">Password</span>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>

          <button
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
