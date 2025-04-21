import React, { useState } from "react";
import AdminPanel from "./AdminPanel"; // הקובץ שמכיל את לוח הניהול המתקדם

export default function Admin() {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "Asaf2311!") {
      setAccessGranted(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
    setPassword("");
  };

  if (accessGranted) return <AdminPanel />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">כניסת מנהל</h2>
        <input
          type="password"
          placeholder="הכנס סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md mb-4"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          התחבר
        </button>
        {error && (
          <p className="text-red-600 mt-3 font-semibold">סיסמה שגויה ❌</p>
        )}
      </form>
    </div>
  );
}
