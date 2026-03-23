import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      form
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login successful");
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />

      <button onClick={handleLogin} className="bg-red-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
};

export default Login;