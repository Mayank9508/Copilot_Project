import { useState } from "react";
import { registerUser } from "../sevices/auth/index.js";

const RegisterPage = ({ setToggle }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name: form.username, email: form.email, password: form.password });
      alert("Registered successfully! Please login.");
      setToggle(true);
    } catch (err) {
      console.error("Register failed:", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="w-80 bg-gray-800 p-6 rounded text-white">
      <h2 className="text-xl mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="p-2 rounded bg-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-2 rounded bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-2 rounded bg-gray-700"
        />
        <button type="submit" className="bg-blue-500 py-2 rounded">
          Register
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?
        <span onClick={() => setToggle(true)} className="text-blue-400 cursor-pointer ml-1">
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;