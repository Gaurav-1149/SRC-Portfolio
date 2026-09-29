import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
  Receipt,
  Calculator,
  Globe,
  Award,
  Users,
  Cpu
} from 'lucide-react';
import { servicesData } from '../data/servicesData.js';

export const Services: React.FC = () => {
  const [searchQuery] = useState('');

  // Icon mapping helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6 text-[#8AC926]" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#8AC926]" />;
      case 'Receipt': return <Receipt className="w-6 h-6 text-[#8AC926]" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-[#8AC926]" />;
      case 'Globe': return <Globe className="w-6 h-6 text-[#8AC926]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#8AC926]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#8AC926]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#8AC926]" />;
      default: return <Award className="w-6 h-6 text-[#8AC926]" />;
    }
  };

  const filteredServices = servicesData.filter((service) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = service.title.toLowerCase().includes(query);
    const descMatch = service.description.toLowerCase().includes(query);
    const microMatch = service.microServices.some((m) => m.toLowerCase().includes(query));
    return titleMatch || descMatch || microMatch;
  });

  return (
    <div className="space-y-16 py-12">
     

      {/* Services Grid with Cards & Micro-Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#8AC926] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[#8AC926]/15 group-hover:bg-[#8AC926]/25 transition-colors">
                      {getIcon(service.iconName)}
                    </div>
                    
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-1 group-hover:text-black">
                    {service.title}
                  </h3>

                </div>

                {/* Micro-Services List */}
                <div className="p-6 space-y-3">
               
                  <ul className="space-y-2">
                    {service.microServices.map((micro, mIdx) => (
                      <li key={mIdx} className="text-xs text-gray-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8AC926] shrink-0 mt-0.5" />
                        <span>{micro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Inquiry */}
              <div className="p-6 pt-0 border-t border-gray-100 mt-4 bg-gray-50/30 flex items-center justify-between">
                <Link
                  to="/contactUs"
                  className="inline-flex items-center pt-3 gap-1.5 text-xs font-bold text-black hover:text-[#8AC926] transition-colors"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
