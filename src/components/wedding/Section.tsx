import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, children, className = "" }: Props) {
  return (
    <section id={id} className={`relative px-6 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-14 text-center"
          >
            {eyebrow && (
              <p className="text-[10px] uppercase tracking-[0.5em] text-foreground/55">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 font-script text-5xl text-gradient-gold sm:text-6xl">
                {title}
              </h2>
            )}
            <div className="gold-divider mx-auto mt-6 w-32" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
