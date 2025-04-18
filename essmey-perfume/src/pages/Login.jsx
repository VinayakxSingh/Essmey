import { useState } from "react";
import { useAppContext } from "../utils/context";
import { useNavigate, Navigate } from "react-router-dom";

const storeUsers = (users) => {
  localStorage.setItem("essmey_users", JSON.stringify(users));
};
const getUsers = () => {
  return JSON.parse(localStorage.getItem("essmey_users") || "[]");
};

export default function Login() {
  const { login, register, isAuthenticated } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/account" replace />;

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    if (!isLogin && form.password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }
    if (!isLogin && form.name.length < 2) {
      setError("Enter your name.");
      return;
    }
    if (!isLogin && (!form.phone || form.phone.length < 10)) {
      setError("Enter a valid phone.");
      return;
    }

    const users = getUsers();

    if (isLogin) {
      // Login
      const found = users.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (!found) {
        setError("Incorrect email or password.");
        return;
      }
      login(found);
      navigate("/account");
    } else {
      // Register
      if (users.find((u) => u.email === form.email)) {
        setError("Email already registered. Login or use another.");
        return;
      }
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      };
      storeUsers([newUser, ...users]);
      register(newUser);
      navigate("/account");
    }
  }

  return (
    <div className="pt-28 pb-20 min-h-[60vh] flex items-center justify-center">
      <div className="bg-white border rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`py-2 px-6 font-semibold border-b-2 transition-colors ${isLogin ? "border-black text-black" : "border-neutral-200 text-neutral-400"}`}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={`py-2 px-6 font-semibold border-b-2 transition-colors ${!isLogin ? "border-black text-black" : "border-neutral-200 text-neutral-400"}`}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleInput}
                className="w-full border rounded px-3 py-2"
                autoComplete="name"
                required={!isLogin}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleInput}
              className="w-full border rounded px-3 py-2"
              autoComplete={isLogin ? "username" : "email"}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleInput}
              className="w-full border rounded px-3 py-2"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleInput}
                className="w-full border rounded px-3 py-2"
                autoComplete="tel"
                required
              />
            </div>
          )}
          {error && <div className="text-red-600 mb-3">{error}</div>}
          <button className="w-full btn-primary mt-2 mb-2">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
