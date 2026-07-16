"use client";

import React, { useEffect, useState } from "react";

const MoneyHeistAnimation = ({ onComplete }) => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // Generate 50 bills with random properties
    const newBills = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      animationDuration: Math.random() * 2.5 + 2, // 2 to 4.5 seconds
      animationDelay: Math.random() * 2, // 0 to 2 seconds
      rotation: Math.random() * 360,
      scale: Math.random() * 0.8 + 0.5, // 0.5 to 1.3
      emoji: Math.random() > 0.6 ? "💶" : Math.random() > 0.3 ? "💵" : "💰"
    }));
    setTimeout(() => setBills(newBills), 0);

    // Stop animation after 7 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Ensure it doesn't block clicks
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes moneyFall {
            0% {
              transform: translateY(-10vh) rotate(0deg);
              opacity: 1;
            }
            80% {
               opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      {bills.map((bill) => (
        <div
          key={bill.id}
          style={{
            position: "absolute",
            left: `${bill.left}%`,
            top: "-10%",
            fontSize: "2.5rem",
            transform: `scale(${bill.scale}) rotate(${bill.rotation}deg)`,
            animation: `moneyFall ${bill.animationDuration}s ease-in ${bill.animationDelay}s forwards`,
          }}
        >
          {bill.emoji}
        </div>
      ))}
    </div>
  );
};

export default MoneyHeistAnimation;
