"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const items = ["Home", "About", "Projects", "Contact"];

export default function NavbarToolAnimation() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex" onMouseLeave={() => setHovered(null)}
    >
    {items.map((item) => (
    <button
      key={item}
      onMouseEnter={() => setHovered(item)}
      className="relative px-4 py-2"
    >
      {hovered === item && (
        <motion.div
          layoutId="pill"
          className="absolute inset-0 rounded-full bg-neutral-200"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <span className="relative z-10">
        {item}
      </span>
    </button>
    ))}
    </div>
  );
}