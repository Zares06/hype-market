"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { WORLD_REGIONS } from "@/lib/data/regions";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CategoryGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-hype-light">
      <div className="section-container">
        <SectionHeading
          title="Explorez le monde"
          subtitle="Des saveurs authentiques sélectionnées aux quatre coins du globe."
        />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {WORLD_REGIONS.map((region, i) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/catalogue?region=${region.id}`}
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                {/* Background color */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundColor: region.color }}
                />

                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,97,69,0.3)_0%,transparent_70%)]" />

                {/* Flag */}
                <div className="absolute top-4 left-4 text-4xl md:text-5xl filter drop-shadow-sm">
                  {region.flag}
                </div>

                {/* Arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 text-hype-dark" />
                </div>

                {/* Content */}
                <div className="relative p-4 md:p-5">
                  <h3 className="font-display font-black uppercase tracking-tight text-hype-dark text-base md:text-lg leading-tight">
                    {region.nameFr}
                  </h3>
                  <p className="font-body text-hype-dark/70 text-xs mt-1 hidden md:block">
                    {region.description}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-hype-brown/0 group-hover:bg-hype-brown/10 transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
