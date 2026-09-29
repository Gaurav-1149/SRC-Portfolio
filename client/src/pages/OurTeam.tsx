import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, ArrowRight, Award, User } from 'lucide-react';
import { teamData } from '../data/teamData.js';

export const OurTeam: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
     

      {/* Partners List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {teamData.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-10"
          >
            {/* Left Photo Container */}
            <div className="relative w-full sm:w-72 md:w-80 lg:w-80 shrink-0 aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-950 group">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-placeholder');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
              ) : null}

              <div className={`fallback-placeholder ${member.image ? 'hidden' : 'flex'} w-full h-full flex-col items-center justify-center p-6 text-center text-gray-400 bg-gray-900`}>
                <div className="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mb-2">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">{member.displayName || member.name}</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Partner Portrait Space</span>
              </div>

          
            </div>

            {/* Right Partner Information */}
            <div className="flex-1 flex flex-col justify-between self-stretch space-y-4">
              <div>
              

                {/* Name Heading */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mt-1.5">
                  {member.displayName || member.name}
                </h2>

                {/* Qualifications Subtitle in Lime Green */}
                <div className="text-xs sm:text-sm font-bold text-[#65a30d] uppercase tracking-wider mt-1">
                  {member.qualificationsShort || member.qualifications}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#65a30d] uppercase tracking-wider mt-1">
                  {member.role}
                </div>

                {/* Narrative / Bio Paragraph */}
                <p className="text-sm text-gray-600 leading-relaxed font-normal mt-4">
                  {member.summaryBio || member.bio.join(' ')}
                </p>

              </div>

            
            </div>
          </div>
        ))}
      </section>

      
    </div>
  );
};
