import React, { useState, useEffect } from 'react';

import { Clock,ArrowUpRight, } from 'lucide-react';
import { fetchAllInsights, InsightPost } from '../services/insightsService.js';

export const Insights: React.FC = () => {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [activeCategory] = useState('All');
  const [searchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllInsights()
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to load insights:', err))
      .finally(() => setLoading(false));
  }, []);



  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 py-12">

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Blog Posts Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-500 text-sm font-medium">
            Loading statutory insights repository...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm bg-white rounded-2xl border border-gray-200">
            No briefings found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#8AC926] transition-all flex flex-col justify-between group"
              >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold uppercase tracking-wider text-[#8AC926] bg-[#8AC926]/10 px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-black leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {post.snippet}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with TaxGuru External Link */}
              <div className="p-6 pt-0 border-t border-gray-100 mt-2 bg-gray-50/50 flex items-center justify-between">
                <div className="text-[11px] text-gray-500 font-medium">
                  By {post.author}
                </div>
                <a
                  href={post.taxGuruUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:text-[#8AC926] transition-colors group-hover:translate-x-0.5"
                >
                  <span>Read on TaxGuru</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8AC926]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      </section>

    
    </div>
  );
};
