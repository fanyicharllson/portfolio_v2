import { motion } from "framer-motion";
import { Code, Globe, Star, Zap } from "lucide-react";
import React from "react";

export default function Stats() {
  return (
    <>
      <section className="py-20 sm:py-24 relative">
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                number: "15+",
                label: "Projects Completed",
                icon: Code,
                color: "from-cyan-500 to-blue-600",
              },
              {
                number: "3+",
                label: "Years Experience",
                icon: Zap,
                color: "from-blue-500 to-purple-600",
              },
              {
                number: "2+",
                label: "Happy Clients",
                icon: Globe,
                color: "from-emerald-500 to-teal-600",
              },
              {
                number: "100%",
                label: "Success Rate",
                icon: Star,
                color: "from-yellow-500 to-orange-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative mb-4">
                  <motion.div
                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-r ${stat.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full rounded-3xl bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                      <stat.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                  </motion.div>
                </div>
                <motion.h3
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-slate-400 font-semibold text-sm sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
