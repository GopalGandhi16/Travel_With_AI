import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How does AI plan my trips?",
    a: "Our AI analyzes your preferences, budget, travel dates, and style to generate a complete itinerary. It searches through millions of flights, hotels, and activities to build the perfect plan — in seconds.",
  },
  {
    q: "Can I edit or customize my AI itinerary?",
    a: "Absolutely! Every itinerary is fully editable. You can drag-and-drop activities, swap hotels, change flights, adjust budget, and add personal notes — the AI adapts to your changes in real time.",
  },
  {
    q: "Can I download my itinerary as a PDF?",
    a: "Yes! You can export your complete trip plan as a beautifully formatted PDF, shareable link, or even sync it to Google Calendar with a single click.",
  },
  {
    q: "Does WanderlustAI compare flights in real time?",
    a: "Yes. Our system searches 500+ airlines and aggregators simultaneously to find you the best price, including hidden-city fares, multi-city options, and last-minute deals.",
  },
  {
    q: "Is my payment information secure?",
    a: "We use bank-level 256-bit SSL encryption for all transactions. We never store raw card details — all payments are processed through PCI-DSS compliant payment gateways.",
  },
  {
    q: "Do you provide visa guidance?",
    a: "Yes! For every destination, we provide up-to-date visa requirements, estimated processing times, required documents, and links to official embassy applications.",
  },
];

const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        open ? "border-brand-200 shadow-md bg-white" : "border-gray-100 bg-white hover:border-gray-200 shadow-card"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? "text-brand-500" : "text-gray-300"}`} />
          <span className={`font-bold text-sm md:text-base transition-colors ${open ? "text-brand-600" : "text-gray-900"}`}>
            {item.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
            open ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pl-14 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => (
  <section className="relative py-24 bg-[#FAFAFA] overflow-hidden">
    <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-100/20 rounded-full filter blur-[80px] pointer-events-none" />

    <div className="section-container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-accent-600 mb-3">Got Questions?</p>
        <h2 className="text-3xl md:text-5xl font-black text-secondary">
          Frequently Asked{" "}
          <span className="gradient-text-accent">Questions</span>
        </h2>
        <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
          Everything you need to know about WanderlustAI.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
