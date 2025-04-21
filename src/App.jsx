import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { db } from "./firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Admin from "./Admin";
import AdminPanel from "./AdminPanel";

function LandingPage({ sent, handleSubmit, scrollToForm }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-600 text-white relative overflow-hidden">
      {/* רקע */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')] bg-cover bg-center opacity-20 blur-sm"></div>

      {/* כותרת וכפתור */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in drop-shadow-xl">
          צריך פתרון מהיר?
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
          אנחנו נמצא את בעל המקצוע המתאים בשבילך — תוך דקות
        </p>

        <button
          onClick={scrollToForm}
          className="bg-white text-green-800 text-lg font-bold px-8 py-3 rounded-xl shadow-md hover:bg-green-100 transition-all animate-fade-in"
        >
          🚀 השאר פרטים עכשיו
        </button>
      </div>

      {/* חץ גלילה */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button onClick={scrollToForm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.75 12 20.25 4.5 12.75" />
          </svg>
        </button>
      </div>

      {/* טופס לידים */}
      <div id="leadForm" className="relative z-10 p-6 max-w-3xl mx-auto">
        {sent ? (
          <div className="bg-white text-green-700 border border-green-500 p-6 rounded-lg text-center shadow-xl animate-bounce-in">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-xl font-semibold">ההודעה נשלחה בהצלחה!</p>
            <p className="text-sm text-green-600 mt-1">נחזור אליך בהקדם 😊</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            <input name="firstName" type="text" required placeholder="שם פרטי"
              className="p-3 rounded-md bg-white/20 placeholder-white/80" />
            <input name="lastName" type="text" required placeholder="שם משפחה"
              className="p-3 rounded-md bg-white/20 placeholder-white/80" />
            <input name="phone" type="tel" required placeholder="טלפון"
              className="p-3 rounded-md bg-white/20 placeholder-white/80" />
            <input name="address" type="text" required placeholder="כתובת"
              className="p-3 rounded-md bg-white/20 placeholder-white/80" />

            <select name="area" required
              className="p-3 rounded-md bg-white text-black">
              <option value="">בחר אזור</option>
              <option value="צפון">צפון</option>
              <option value="מרכז">מרכז</option>
              <option value="דרום">דרום</option>
            </select>

            <select name="profession" required
              className="p-3 rounded-md bg-white text-black">
              <option value="">בחר תחום</option>
              <option value="חשמלאי">חשמלאי</option>
              <option value="אינסטלטור">אינסטלטור</option>
              <option value="שרברב">שרברב</option>
              <option value="מנעולן">מנעולן</option>
              <option value="נגמר לי הכסף 😂">נגמר לי הכסף</option>
            </select>

            <textarea name="problem" rows="4" placeholder="פירוט על הבעיה"
              className="col-span-full p-3 rounded-md bg-white/20 placeholder-white/80"></textarea>

            <button type="submit"
              className="col-span-full bg-white text-green-800 font-bold py-3 rounded-md hover:bg-green-200 transition shadow-lg">
              🚀 שלח עכשיו
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newLead = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      address: form.address.value,
      area: form.area.value,
      profession: form.profession.value,
      problem: form.problem.value,
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "leads"), newLead);
      setSent(true);
      form.reset();
    } catch (error) {
      console.error("שגיאה בשליחה:", error);
    }
  };

  const scrollToForm = () => {
    const section = document.getElementById("leadForm");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage sent={sent} handleSubmit={handleSubmit} scrollToForm={scrollToForm} />}
      />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
    </Routes>
  );
}
