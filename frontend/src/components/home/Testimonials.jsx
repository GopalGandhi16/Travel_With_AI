import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";


const testimonials = [
  {
    name: "Arjun Mehta",
    country: "🇮🇳 India",
    visited: "Japan",
    rating: 5,
    avatar: "AM",
    avatarColor: "from-violet-500 to-purple-600",
    text: "WanderlustAI planned my honeymoon perfectly. Every detail — from flights to restaurant bookings — was handled. Saved us 30+ hours of research!",
  },
  {
    name: "Sophie Laurent",
    country: "🇫🇷 France",
    visited: "Bali",
    rating: 5,
    avatar: "SL",
    avatarColor: "from-pink-400 to-rose-600",
    text: "I was skeptical about AI planning my solo trip, but this blew me away. The itinerary was spot-on with my vibe — beach days, yoga retreats, and great local food.",
  },
  {
    name: "David Chen",
    country: "🇸🇬 Singapore",
    visited: "Europe",
    rating: 5,
    avatar: "DC",
    avatarColor: "from-sky-400 to-blue-600",
    text: "Planned a 15-day Europe trip for my family of 4 under budget. The budget breakdown was incredibly accurate and the AI even suggested off-season tips!",
  },
  {
    name: "Priya Sharma",
    country: "🇮🇳 India",
    visited: "Maldives",
    rating: 5,
    avatar: "PS",
    avatarColor: "from-emerald-400 to-teal-600",
    text: "The AI suggested an overwater villa that wasn't even on my radar. Best decision ever. Plus the packing checklist was literally perfect for the weather.",
  },
  {
    name: "Kenji Watanabe",
    country: "🇯🇵 Japan",
    visited: "Iceland",
    rating: 5,
    avatar: "KW",
    avatarColor: "from-amber-400 to-orange-500",
    text: "Saw the Northern Lights on the exact night AI predicted! The weather-based scheduling was next level. Will never plan a trip manually again.",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  const t = testimonials[active];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-50/50 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">Loved by Travelers</p>
          <h2 className="text-3xl md:text-5xl font-black text-secondary">
            Real Stories,{" "}
            <span className="gradient-text-brand">Real Trips</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Main card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="bg-[#FAFAFA] rounded-3xl p-8 shadow-card border border-gray-100 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-8 opacity-10">
                <Quote className="w-16 h-16 text-brand-500" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
                <span className="ml-2 text-sm font-bold text-gray-700">{t.rating}.0</span>
              </div>

              {/* Text */}
              <p className="text-gray-700 text-lg leading-relaxed font-medium mb-8">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-black text-sm shadow-md`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Visited</p>
                  <p className="text-sm font-bold text-brand-500">{t.visited}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-500 hover:shadow-sm transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active ? "w-8 h-2.5 bg-brand-500" : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-500 hover:shadow-sm transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Avatar preview strip */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {testimonials.map((tt, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tt.avatarColor} flex items-center justify-center text-white text-xs font-black shadow-sm transition-all duration-300 ${
                  i === active ? "ring-2 ring-brand-500 ring-offset-2 scale-110" : "opacity-50 hover:opacity-80"
                }`}
              >
                {tt.avatar}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
