"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const sections = [
  {
    title: "Create coding tests effortlessly",
    text: "Auto Test AI lets you generate, validate and share programming challenges instantly.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", // dev workspace
  },
  {
    title: "AI-driven validation",
    text: "Submit your code and get instant feedback from an integrated AI model.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", // code terminal
  },
  {
    title: "Upgrade to PRO",
    text: "Unlock unlimited test generation and advanced analytics.",
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786", // charts / dashboard
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section className="flex flex-col flex-1">
      {sections.map((s, i) => (
        <article
          key={i}
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-32 max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 px-4">
            <h2 className="text-3xl font-semibold">{s.title}</h2>
            <p className="text-muted-foreground">{s.text}</p>
          </motion.div>

          <motion.div
            style={{ opacity }}
            className="relative h-[400px] flex justify-center">
            <Image
              src={s.img}
              alt={s.title}
              width={500}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </motion.div>
        </article>
      ))}
    </section>
  );
}
