import { useState } from "react";

const LoginPage = ({ setToggle }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", form);
  };

  return (
    <div className="w-80 bg-gray-800 p-6 rounded text-white">
      <h2 className="text-xl mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="p-2 rounded bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="p-2 rounded bg-gray-700"
        />

        <button className="bg-blue-500 py-2 rounded">
          Login
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Don't have an account?
        <span
          onClick={() => setToggle(false)}
          className="text-blue-400 cursor-pointer ml-1"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginPage;