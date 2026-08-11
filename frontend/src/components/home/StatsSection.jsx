import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { icon: "🌍", value: 100, suffix: "+", label: "Countries", sublabel: "Covered worldwide", color: "from-blue-400 to-indigo-600" },
  { icon: "✈️", value: 500, suffix: "", label: "Airlines", sublabel: "Best fares guaranteed", color: "from-brand-400 to-orange-500" },
  { icon: "🏨", value: 50000, suffix: "+", label: "Hotels", sublabel: "Handpicked stays", color: "from-emerald-400 to-teal-600" },
  { icon: "⭐", value: 4.9, suffix: "", label: "User Rating", sublabel: "From 100k+ travelers", color: "from-amber-400 to-yellow-500" },
];

function Counter({ target, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const isDecimal = !Number.isInteger(target);
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (step >= steps) clearInterval(timer);
    }, (duration * 1000) / steps);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {typeof count === "number" && !Number.isInteger(target)
        ? count.toFixed(1)
        : count >= 1000
        ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "k"
        : count}
      {suffix}
    </span>
  );
}

const StatsSection = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-100/40 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-100/30 rounded-full filter blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">By the numbers</p>
          <h2 className="text-3xl md:text-4xl font-black text-secondary">
            Trusted by Millions of{" "}
            <span className="gradient-text-brand">Travelers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}
              className="relative card-float bg-white rounded-3xl p-6 shadow-card border border-gray-100 overflow-hidden flex flex-col items-center text-center"
            >
              {/* Gradient orb behind icon */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 filter blur-xl`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg mb-4`}>
                {stat.icon}
              </div>

              {/* Count */}
              <div className="text-4xl font-black text-secondary mb-1 tracking-tight">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>

              <p className="font-bold text-gray-900 text-sm">{stat.label}</p>
              <p className="text-gray-400 text-xs mt-1 font-medium">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
