import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    await axios.post("http://localhost:3000/api/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <input placeholder="Username" onChange={(e) => setForm({...form, username: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />

      <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;