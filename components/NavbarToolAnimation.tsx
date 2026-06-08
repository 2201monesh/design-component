"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { IconSelector } from "@tabler/icons-react";
import { GrNodes } from "react-icons/gr";

const items = ["Products", "Solutions", "Resources", "Pricing"];

export default function NavbarToolAnimation() {
  const [hovered, setHovered] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = (item: string) => {
    if (timer.current) clearTimeout(timer.current);
    setHovered(item);
  };

  const onLeave = () => {
    timer.current = setTimeout(() => setHovered(null), 80);
  };

  return (
    <div className="relative">
      <div className="flex">
        {items.map((item) => (
          <div
            key={item}
            className="relative"
            onMouseEnter={() => onEnter(item)}
            onMouseLeave={onLeave}
          >
            <button className="relative flex items-center px-4 py-2">
              {hovered === item && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-0 rounded-full bg-neutral-200"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {item}
                {item !== "Contact" ? <IconSelector size={14} stroke={1.5} /> : null}
              </span>
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {(hovered === "Products" || hovered === "Solutions") && (
          <motion.div
            className="absolute top-full left-0 pt-2 z-50"
            onMouseEnter={() => onEnter(hovered!)}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            {hovered === "Products" ? <ProductCard /> : <SolutionsCard />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ProductCard = () => {
  return (
    <motion.div
      layoutId="dropdown-card"
      className="w-115 h-62 rounded-2xl border border-neutral-300 bg-white shadow-sm flex items-center justify-between px-4 py-4 gap-4"
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    >
        <div className="w-[50%] border h-full rounded-xl border-neutral-300 flex items-center justify-center">
            <div className="border border-neutral-300 rounded-lg w-[95%] h-[95%] flex flex-col">
                <div className="w-full h-[70%] flex items-center justify-center"><GrNodes size={30} /></div>
                <div className="px-3 mt-2">
                    <p className="text-sm font-semibold">One platform</p>
                    <p className="text-sm text-neutral-600">Compute and storage</p>
                </div>
            </div>
        </div>
        <div className="w-[50%] h-full text-sm flex flex-col justify-between">
            <div>
                <p className="font-semibold">Hosting</p>
                <p className="text-neutral-600">Deploy any framework to a global edge framework</p>
            </div>
            <div>
                <p className="font-semibold">SQL Database</p>
                <p className="text-neutral-600">A fully managed postgress database that scales with you</p>
            </div>
            <div>
                <p className="font-semibold">CDN</p>
                <p className="text-neutral-600">Cache and serve assets from hundreds of locations worldwide</p>
            </div>
        </div>
    </motion.div>
  );
};

const SolutionsCard = () => {
  return (
    <motion.div
      layoutId="dropdown-card"
      className="w-115 h-70 rounded-xl border border-neutral-300 bg-white p-4 shadow-sm"
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    />
  );
};
