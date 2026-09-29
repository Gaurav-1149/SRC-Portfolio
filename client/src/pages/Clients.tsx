import React, { useState } from 'react';
import { industriesData } from '../data/industriesData.js';

export const Clients: React.FC = () => {
  const [searchTerm] = useState('');
  const [selectedCategory ] = useState('All');

  const categories = ['All', 'Industrial', 'Hospitality', 'Technology', 'Infrastructure', 'Consumer Goods', 'Healthcare'];

  const filteredIndustries = industriesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.servicesDelivered.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 py-12">
      {/* Page Header */}
     <div className='flex justify-center'>

        <div className="flex justify-center flex-col items-center w-2/3 gap-3">

            <h1 className="text-3xl sm:text-5xl font-extrabold ">
              Industries We Serve
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              Over the years, we have earned client appreciation while delivering solutions in a variety of industries, including:
            </p>
        </div>
     </div>

      {/* Industries Filter & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
       

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((ind) => (
            <div
              key={ind.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#8AC926] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{ind.name}</h3>
                
              </div>
            </div>
          ))}
        </div>
      </section>


     
    </div>
  );
};
