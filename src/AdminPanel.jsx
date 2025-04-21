import React, { useEffect, useState } from "react";
import { db } from "./firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminPanel() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filterArea, setFilterArea] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      const querySnapshot = await getDocs(collection(db, "leads"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeads(data);
      setFilteredLeads(data);
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    let result = leads;

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.firstName?.toLowerCase().includes(lowerSearch) ||
          lead.lastName?.toLowerCase().includes(lowerSearch) ||
          lead.phone?.includes(lowerSearch) ||
          lead.profession?.toLowerCase().includes(lowerSearch)
      );
    }

    if (filterArea) {
      result = result.filter((lead) => lead.area === filterArea);
    }

    setFilteredLeads(result);
  }, [search, filterArea, leads]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "leads", id));
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-right mb-6">ניהול לידים</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="חיפוש לפי שם / טלפון / מקצוע"
          className="p-3 rounded-md border w-full md:w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 rounded-md border w-full md:w-48"
          onChange={(e) => setFilterArea(e.target.value)}
        >
          <option value="">כל האזורים</option>
          <option value="צפון">צפון</option>
          <option value="מרכז">מרכז</option>
          <option value="דרום">דרום</option>
        </select>
      </div>

      <div className="overflow-auto shadow border rounded-lg">
        <table className="w-full text-sm text-center">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 border">שם פרטי</th>
              <th className="p-2 border">שם משפחה</th>
              <th className="p-2 border">טלפון</th>
              <th className="p-2 border">כתובת</th>
              <th className="p-2 border">אזור</th>
              <th className="p-2 border">תחום</th>
              <th className="p-2 border">בעיה</th>
              <th className="p-2 border">תאריך</th>
              <th className="p-2 border">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-2 border">{lead.firstName}</td>
                <td className="p-2 border">{lead.lastName}</td>
                <td className="p-2 border">{lead.phone}</td>
                <td className="p-2 border">{lead.address}</td>
                <td className="p-2 border">{lead.area}</td>
                <td className="p-2 border">{lead.profession}</td>
                <td className="p-2 border">{lead.problem || "-"}</td>
                <td className="p-2 border">
                  {lead.createdAt?.toDate?.().toLocaleString("he-IL") || "—"}
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(lead.id)}
                  >
                    מחיקה
                  </button>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="9" className="text-gray-500 p-4">
                  אין לידים תואמים
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
