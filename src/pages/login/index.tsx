import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await auth.login(username, password);
    if (ok) {
      navigate("/home");
    } else {
      setError("Invalid credentials. Try: admin / password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign in (mock)</h2>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 rounded bg-gray-700"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-gray-700"
          />
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-yellow-500 rounded text-black font-semibold">
              Sign in
            </button>
            <div className="text-sm text-gray-400">Try admin / password</div>
          </div>
        </form>
      </div>
    </div>
  );
}
