import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Navigation, Calendar, Users, Wallet, Sparkles, ChevronDown
} from "lucide-react";

const quickChips = [
  { label: "🌴 Goa", query: "Goa" },
  { label: "🇯🇵 Japan", query: "Japan" },
  { label: "🏝 Bali", query: "Bali" },
  { label: "🏙 Dubai", query: "Dubai" },
  { label: "🌍 Europe", query: "Europe" },
  { label: "🏖 Beach", query: "Beach" },
  { label: "🏔 Adventure", query: "Adventure" },
  { label: "💎 Luxury", query: "Luxury" },
  { label: "🗓 Weekend Trip", query: "Weekend Trip" },
];

const travelStyles = ["Solo", "Couple", "Family", "Friends", "Business"];
const tripTypes = ["Adventure", "Relaxation", "Luxury", "Backpacking", "Road Trip"];

const SelectField = ({ label, icon: Icon, options, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-premium appearance-none pr-10 cursor-pointer font-medium text-gray-800"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

const InputField = ({ label, icon: Icon, placeholder, type = "text", value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-premium font-medium"
    />
  </div>
);

const AITripCard = () => {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    departure: "",
    returnDate: "",
    budget: "",
    travelers: "2",
    travelStyle: "Couple",
    tripType: "Relaxation",
  });
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2500);
  };

  const handleChip = (query) => {
    setForm((prev) => ({ ...prev, destination: query }));
  };

  return (
    <div className="glass-card bg-white/80 backdrop-blur-xl shadow-float rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">AI Trip Generator</h2>
            <p className="text-xs text-gray-500">Fill in the details — AI does the rest</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">AI Ready</span>
          </div>
        </div>
      </div>

      {/* Form Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField
          label="Origin"
          icon={Navigation}
          placeholder="Mumbai, Delhi, Bangalore…"
          value={form.origin}
          onChange={set("origin")}
        />
        <InputField
          label="Destination"
          icon={MapPin}
          placeholder="Japan, Bali, Paris…"
          value={form.destination}
          onChange={set("destination")}
        />
        <InputField
          label="Departure Date"
          icon={Calendar}
          type="date"
          placeholder=""
          value={form.departure}
          onChange={set("departure")}
        />
        <InputField
          label="Return Date"
          icon={Calendar}
          type="date"
          placeholder=""
          value={form.returnDate}
          onChange={set("returnDate")}
        />
        <InputField
          label="Budget (₹)"
          icon={Wallet}
          placeholder="e.g. 80,000"
          value={form.budget}
          onChange={set("budget")}
        />
        <InputField
          label="Travelers"
          icon={Users}
          type="number"
          placeholder="2"
          value={form.travelers}
          onChange={set("travelers")}
        />
        <SelectField
          label="Travel Style"
          icon={Users}
          options={travelStyles}
          value={form.travelStyle}
          onChange={set("travelStyle")}
        />
        <SelectField
          label="Trip Type"
          icon={MapPin}
          options={tripTypes}
          value={form.tripType}
          onChange={set("tripType")}
        />

        {/* Generate Button */}
        <div className="flex flex-col justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-gradient text-white font-bold py-[10px] px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate AI Trip
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Chips */}
      <div className="px-6 pb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Quick Suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          {quickChips.map((chip) => (
            <button
              key={chip.query}
              onClick={() => handleChip(chip.query)}
              className={`chip chip-outline text-sm ${
                form.destination === chip.query ? "!bg-brand-500 !text-white !border-brand-500" : ""
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Result Preview */}
      {generated && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
          className="border-t border-gray-100 px-6 py-5 bg-gradient-to-br from-accent-50/50 to-brand-50/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent-600" />
            <span className="font-bold text-gray-900 text-sm">AI Trip Generated!</span>
            <span className="ml-auto text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-100">
              {form.destination || "Destination"} · {form.travelers} traveler(s)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "✈️", label: "Flights Found", value: "12 options" },
              { icon: "🏨", label: "Hotels", value: "24 stays" },
              { icon: "📅", label: "Itinerary", value: "7 days" },
              { icon: "💰", label: "Est. Budget", value: `₹${form.budget || "80,000"}` },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-50">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button className="flex-1 btn-gradient text-white text-sm font-bold py-2.5 rounded-xl">
              View Full Itinerary
            </button>
            <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Customize
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AITripCard;
