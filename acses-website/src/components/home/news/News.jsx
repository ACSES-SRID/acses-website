import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchApi } from "../../../utils/api";

const formatNewsDate = (value) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
};

const News = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchApi("/api/announcements");
        const list = Array.isArray(data) ? data : [];
        const publicPublished = list.filter(
          (a) => a.status === "published" && (a.visibility === "public" || a.visibility == null)
        );
        const sorted = [...publicPublished].sort((a, b) => {
          const da = new Date(a.date || a.createdAt || 0).getTime();
          const db = new Date(b.date || b.createdAt || 0).getTime();
          return db - da;
        });
        setItems(
          sorted.map((a) => ({
            id: a._id || a.id,
            title: a.title,
            date: formatNewsDate(a.date || a.createdAt),
            description: a.body || "",
            author: a.author,
          }))
        );
      } catch (e) {
        console.error("Failed to load announcements:", e);
        setError("Could not load announcements right now.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section id="news" className="w-full flex justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">News & Announcements</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay informed about the latest updates and achievements from ACSES.
            </p>
          </div>
        </div>

        {loading && (
          <p className="mx-auto max-w-5xl py-12 text-center text-gray-500">Loading news…</p>
        )}
        {!loading && error && <p className="mx-auto max-w-5xl py-12 text-center text-red-600">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="mx-auto max-w-5xl py-12 text-center text-gray-500">No published announcements yet. Check back soon.</p>
        )}

        {!loading && items.length > 0 && (
          <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-3">
            {items.map((news) => (
              <motion.div key={news.id} className="bg-white rounded-lg shadow-md p-6" whileHover={{ scale: 1.02 }}>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{news.title}</h3>
                  <p className="text-gray-500">{news.date}</p>
                  {news.author && <p className="text-xs text-gray-400">By {news.author}</p>}
                </div>
                <p className="mt-3 text-gray-500 line-clamp-6">{news.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
