import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Wallet, Cloud, Train } from "lucide-react";

const itinerary = [
  {
    day: "Day 1",
    label: "Arrival & City Vibes",
    activities: [
      { time: "14:00", title: "Land at Narita Airport", type: "✈️", cost: "—", transport: "Express Train", weather: "☀️ 24°C" },
      { time: "16:00", title: "Hotel Check-in — Shinjuku", type: "🏨", cost: "₹7,200", transport: "Taxi", weather: "☀️ 24°C" },
      { time: "18:30", title: "Shinjuku Gyoen Garden Walk", type: "🌿", cost: "₹200", transport: "Walk", weather: "🌤 22°C" },
      { time: "20:00", title: "Dinner at Omoide Yokocho", type: "🍜", cost: "₹800", transport: "Walk", weather: "🌙 20°C" },
    ],
  },
  {
    day: "Day 2",
    label: "Temples & Technology",
    activities: [
      { time: "08:00", title: "Senso-ji Temple, Asakusa", type: "⛩️", cost: "Free", transport: "Subway", weather: "☀️ 26°C" },
      { time: "11:00", title: "Akihabara Tech Walk", type: "🎮", cost: "₹1,200", transport: "Subway", weather: "🌤 28°C" },
      { time: "14:00", title: "TeamLab Digital Museum", type: "🎨", cost: "₹2,500", transport: "Taxi", weather: "⛅ 27°C" },
      { time: "19:00", title: "Ramen Dinner at Harajuku", type: "🍜", cost: "₹600", transport: "Walk", weather: "🌙 22°C" },
    ],
  },
  {
    day: "Day 3",
    label: "Shibuya & Mt. Fuji",
    activities: [
      { time: "07:00", title: "Shibuya Crossing at Dawn", type: "🌆", cost: "Free", transport: "Subway", weather: "☀️ 20°C" },
      { time: "09:30", title: "Takeshita Street Shopping", type: "🛍️", cost: "₹3,000", transport: "Walk", weather: "🌤 24°C" },
      { time: "12:00", title: "Tsukiji Fish Market Lunch", type: "🐟", cost: "₹1,000", transport: "Subway", weather: "☀️ 26°C" },
      { time: "15:00", title: "Mt. Fuji Day Trip", type: "🗻", cost: "₹2,000", transport: "Bus", weather: "⛅ 15°C" },
    ],
  },
];

const SampleItinerary = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section className="relative py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent-100/20 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">Sample Plan</p>
          <h2 className="text-3xl md:text-5xl font-black text-secondary">
            AI-Generated{" "}
            <span className="gradient-text-brand">Itinerary</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Every detail — timing, cost, transport, weather — planned automatically.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Day tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto hide-scrollbar pb-2">
            {itinerary.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeDay === i
                    ? "btn-gradient text-white shadow-brand"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand-300"
                }`}
              >
                <span className="block">{item.day}</span>
                <span className={`text-[10px] font-medium ${activeDay === i ? "text-white/80" : "text-gray-400"}`}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Activities */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-3"
            >
              {itinerary[activeDay].activities.map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-white rounded-2xl p-4 shadow-card border border-gray-100 hover:shadow-card-hover hover:border-brand-100 transition-all duration-300 flex items-center gap-5"
                >
                  {/* Time */}
                  <div className="flex-shrink-0 text-center w-14">
                    <p className="text-xs font-bold text-brand-500">{act.time}</p>
                    <div className="w-0.5 h-6 bg-gradient-to-b from-brand-400 to-transparent mx-auto mt-1" />
                  </div>

                  {/* Icon */}
                  <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-xl border border-gray-100 group-hover:scale-105 transition-transform">
                    {act.type}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{act.title}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Train className="w-3 h-3" /> {act.transport}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Cloud className="w-3 h-3" /> {act.weather}
                      </span>
                    </div>
                  </div>

                  {/* Cost */}
                  <div className="flex-shrink-0 text-right">
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      <Wallet className="w-3 h-3" />
                      {act.cost}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Summary footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-3 items-center justify-between bg-white rounded-2xl p-4 shadow-card border border-gray-100"
          >
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span className="font-semibold text-gray-700">Tokyo, Japan</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-accent-500" />
                <span className="font-semibold text-gray-700">7 Days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wallet className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-gray-700">~₹1,20,000 total</span>
              </div>
            </div>
            <button className="btn-gradient text-white text-sm font-bold px-5 py-2.5 rounded-xl">
              Get This Plan
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SampleItinerary;
