
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // <-- add this

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace "admin123" with your real password or env variable
    if (password === "admin123") {
      onLogin();
      navigate("/subscribers");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-secondary/5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-dark text-center">
          Admin Login
        </h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-primary-30 rounded-lg focus:outline-none focus:border-primary transition-all duration-300"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
        >
          Login
        </button>
      </form>
    </div>
  );
}
