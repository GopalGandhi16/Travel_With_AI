import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send } from "lucide-react";

const aiResponse = {
  flights: [
    { from: "Mumbai", to: "Tokyo", airline: "ANA", price: "₹38,500", duration: "9h 30m" },
    { from: "Mumbai", to: "Tokyo", airline: "Air India", price: "₹41,200", duration: "10h 15m" },
  ],
  hotels: [
    { name: "Park Hyatt Tokyo", stars: 5, price: "₹18,000/night", area: "Shinjuku" },
    { name: "Shinjuku Granbell", stars: 4, price: "₹7,200/night", area: "Shinjuku" },
  ],
  itinerary: [
    { day: "Day 1", activities: ["Land at Narita Airport", "Hotel Check-in Shinjuku", "Evening at Shinjuku Gyoen", "Dinner at Omoide Yokocho"] },
    { day: "Day 2", activities: ["Senso-ji Temple Asakusa", "Akihabara Tech Walk", "TeamLab Digital Art Museum", "Ramen dinner Harajuku"] },
    { day: "Day 3", activities: ["Shibuya Crossing & Sky Deck", "Takeshita Street Shopping", "Tsukiji Fish Market Lunch", "Mt. Fuji Day Trip"] },
  ],
  budget: { flights: "₹38,500", hotel: "₹50,400", food: "₹15,000", experiences: "₹12,000", transport: "₹4,100", total: "₹1,20,000" },
};

const TypingText = ({ text, onDone }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(timer); onDone?.(); }
    }, 18);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayed}<span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse" /></span>;
};

const AIChatPreview = () => {
  const [phase, setPhase] = useState(0); // 0=idle, 1=typing user, 2=ai thinking, 3=result
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (started) return;
    setStarted(true);
    setPhase(1);
    setTimeout(() => setPhase(2), 2000);
    setTimeout(() => setPhase(3), 4500);
  };

  return (
    <section className="relative py-24 bg-gradient-dark overflow-hidden">
      {/* Bg blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-500/10 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-600/10 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-3">AI in Action</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Watch AI Plan Your{" "}
            <span className="gradient-text-brand">Perfect Trip</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Just type your dream and watch AI build a complete travel plan instantly.
          </p>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card-dark rounded-3xl overflow-hidden shadow-float border border-white/10">
            {/* Window bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-brand-400" />
                WanderlustAI Chat
              </div>
              <div className="w-12" />
            </div>

            {/* Messages */}
            <div className="p-6 min-h-[420px] flex flex-col gap-5 overflow-auto">

              {/* System prompt */}
              <div className="flex justify-center">
                <span className="text-xs text-gray-600 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  New conversation started
                </span>
              </div>

              {/* User message */}
              {phase >= 1 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                  <div className="max-w-[80%] bg-gradient-to-br from-brand-500 to-orange-500 text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-brand text-sm font-medium">
                    {phase === 1 ? (
                      <TypingText text="Plan a 7-day Japan trip under ₹1,20,000" />
                    ) : (
                      "Plan a 7-day Japan trip under ₹1,20,000"
                    )}
                  </div>
                </motion.div>
              )}

              {/* AI thinking */}
              {phase === 2 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0 shadow-accent">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      <span className="text-gray-400 text-xs ml-1">AI is planning your trip…</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* AI response */}
              <AnimatePresence>
                {phase === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0 shadow-accent">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10 text-gray-200 text-sm">
                        Here's your complete 7-day Japan itinerary under ₹1,20,000! ✨
                      </div>

                      {/* Flights */}
                      <div className="bg-white/8 border border-white/10 rounded-2xl p-4 space-y-2">
                        <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-3">✈️ Flights Found</p>
                        {aiResponse.flights.map((f, i) => (
                          <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
                            <div className="text-white text-xs font-semibold">{f.from} → {f.to}</div>
                            <div className="text-gray-400 text-xs">{f.airline} · {f.duration}</div>
                            <div className="text-emerald-400 text-xs font-bold">{f.price}</div>
                          </div>
                        ))}
                      </div>

                      {/* Hotels */}
                      <div className="bg-white/8 border border-white/10 rounded-2xl p-4">
                        <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">🏨 Hotels</p>
                        {aiResponse.hotels.map((h, i) => (
                          <div key={i} className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-white text-xs font-semibold">{h.name}</p>
                              <p className="text-gray-500 text-xs">{h.area} · {"⭐".repeat(h.stars)}</p>
                            </div>
                            <p className="text-emerald-400 text-xs font-bold">{h.price}</p>
                          </div>
                        ))}
                      </div>

                      {/* Budget */}
                      <div className="bg-white/8 border border-white/10 rounded-2xl p-4">
                        <p className="text-xs font-bold text-accent-400 uppercase tracking-wider mb-3">💰 Budget Breakdown</p>
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(aiResponse.budget).map(([k, v]) => (
                            <div key={k} className={`text-center ${k === "total" ? "col-span-3 bg-gradient-to-r from-brand-500/20 to-accent-600/20 border border-brand-500/30 rounded-xl p-2" : ""}`}>
                              <p className="text-gray-400 text-[10px] capitalize">{k}</p>
                              <p className={`font-bold text-xs ${k === "total" ? "text-brand-400" : "text-white"}`}>{v}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="px-5 py-4 border-t border-white/10 bg-white/5 flex items-center gap-3">
              <input
                readOnly
                placeholder="Ask AI to plan your trip…"
                className="flex-1 bg-transparent text-gray-400 text-sm outline-none placeholder-gray-600"
              />
              <button
                onClick={handleStart}
                className={`btn-gradient text-white p-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all ${started ? "opacity-60 cursor-default" : ""}`}
              >
                <Send className="w-4 h-4" />
                {phase === 0 ? "Try It" : phase === 3 ? "Done!" : "…"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIChatPreview;
