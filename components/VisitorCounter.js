"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        let url = "https://api.counterapi.dev/v1/arcade-points-calc/visits/up";

        
        const response = await fetch(url);
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(10px)",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 9999
    }}>
      <Users size={16} color="#4285F4" />
      <span style={{ color: "var(--br-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>
        Total Visitors: <span style={{ color: "#fff" }}>{count.toLocaleString()}</span>
      </span>
    </div>
  );
}
