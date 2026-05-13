import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCitiesByCategory } from "../../service/cityService";

const TABS = [
  {
    key:      "Flowers",
    label:    "🌸 Flower Cities",
    base:     "/florist-near-me",
    accent:   "red",
    heading:  "Online Flower Delivery",
  },
  {
    key:      "Cakes",
    label:    "🎂 Cake Cities",
    base:     "/order-cake-online",
    accent:   "amber",
    heading:  "Online Cake Delivery",
  },
  {
    key:      "Plants",
    label:    "🌿 Plant Cities",
    base:     "/plants-online",
    accent:   "green",
    heading:  "Online Plant Delivery",
  },
];

const ACCENT_CLASSES = {
  red:   { tab: "bg-red-600 text-white",   tabOff: "text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200",   link: "text-red-700 hover:text-red-500",   dot: "bg-red-500"   },
  amber: { tab: "bg-amber-500 text-white", tabOff: "text-gray-600 hover:text-amber-600 hover:bg-amber-50 border border-gray-200", link: "text-amber-700 hover:text-amber-500", dot: "bg-amber-500" },
  green: { tab: "bg-green-600 text-white", tabOff: "text-gray-600 hover:text-green-600 hover:bg-green-50 border border-gray-200", link: "text-green-700 hover:text-green-500", dot: "bg-green-500" },
};

// Group cities alphabetically by first letter
function groupByLetter(cities) {
  const map = {};
  for (const city of cities) {
    const letter = (city.cityName || city.url || "?")[0].toUpperCase();
    if (!map[letter]) map[letter] = [];
    map[letter].push(city);
  }
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
}

export default function DeliveryCities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "Flowers";
  const [activeTab,   setActiveTab]   = useState(
    TABS.find((t) => t.key === initialTab) ? initialTab : "Flowers"
  );
  const [cities,      setCities]      = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [search,      setSearch]      = useState("");

  const tab = TABS.find((t) => t.key === activeTab);
  const ac  = ACCENT_CLASSES[tab.accent];

  // Apply page meta
  useEffect(() => {
    document.title = `Delivery Cities | RedHeart — Flowers, Cakes & Plants Across India`;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement("meta"); desc.name = "description"; document.head.appendChild(desc); }
    desc.setAttribute("content", "RedHeart delivers fresh flowers, cakes, and plants to 830+ cities across India. Find your city and order now for same-day delivery.");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.setAttribute("href", "https://www.redheart.in/delivery-cities");
  }, []);

  // Load cities on tab change
  useEffect(() => {
    setLoading(true);
    setSearch("");
    getCitiesByCategory(activeTab)
      .then(setCities)
      .finally(() => setLoading(false));
    setSearchParams({ tab: activeTab }, { replace: true });
  }, [activeTab]);

  // Filter by search
  const filtered = search.trim()
    ? cities.filter((c) => c.cityName.toLowerCase().includes(search.trim().toLowerCase()))
    : cities;

  const grouped = groupByLetter(filtered);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-4 py-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          We Deliver Across India
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          Fresh flowers, delicious cakes & beautiful plants delivered to 830+ cities. Find your city below.
        </p>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-5xl mx-auto flex gap-2 py-3">
          {TABS.map((t) => {
            const a = ACCENT_CLASSES[t.accent];
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === t.key ? a.tab : a.tabOff
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search ──────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${tab.key.toLowerCase()} delivery city…`}
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        {!loading && (
          <p className="text-xs text-gray-400 mt-2">
            {filtered.length} {filtered.length === 1 ? "city" : "cities"} available
          </p>
        )}
      </div>

      {/* ── City grid ───────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-16 pt-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-16 text-sm">No cities found.</p>
        ) : (
          <div className="space-y-8">
            {grouped.map(([letter, letterCities]) => (
              <div key={letter}>
                {/* Letter heading */}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-8 h-8 rounded-full ${ac.dot} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                    {letter}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Cities in a responsive grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {letterCities.map((city) => (
                    <Link
                      key={city._id}
                      to={`${tab.base}/${city.url.split("/").pop()}`}
                      className={`text-sm py-1.5 px-2 rounded hover:underline transition-colors ${ac.link}`}
                    >
                      {city.cityName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
