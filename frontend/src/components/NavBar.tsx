"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout");
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-foreground">
          <a href="/" className="hover:text-accent transition-colors">
            MOODLEND
          </a>
        </div>

        <ul className="flex space-x-6">
          <li>
            <a href="/" className="text-secondary-text hover:text-foreground transition-colors">
              
            </a>
          </li>
          
        </ul>

        <button
          onClick={handleLogout}
          className="bg-button-primary hover:bg-button-hover text-foreground px-4 py-2 rounded"
          
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;