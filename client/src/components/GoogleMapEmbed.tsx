import React from 'react';

interface GoogleMapEmbedProps {
  className?: string;
  height?: string;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  className = '',
  height = 'h-64',
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-lg shadow-sm border border-gray-200 relative ${height} ${className}`}>
      <iframe
        title="Singhal Rakesh & Co. Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114704043697!2d77.2185!3d28.6295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b670f5e1%3A0xc3cf9b7b96e9529b!2sBarakhamba%20Rd%2C%20Connaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1711650000000!5m2!1sen!2sin"
        className="w-full h-full border-0"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="absolute bottom-2 left-2 bg-white/95 px-2.5 py-1 rounded shadow text-[11px] font-medium text-gray-700 pointer-events-none">
        📍 Connaught Place & Mianwali Nagar, New Delhi
      </div>
    </div>
  );
};
