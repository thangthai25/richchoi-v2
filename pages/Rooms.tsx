import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_ROOMS } from '../constants';
import { Star, ArrowRight } from 'lucide-react';

const Rooms: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-navy-900 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold relative z-10">{t.rooms}</h1>
        <p className="text-gold-400 mt-4 font-light tracking-widest relative z-10">{t.subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_ROOMS.map(room => (
            <div key={room.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[500px]">
              {/* Image Background */}
              <div className="absolute inset-0">
                <img 
                  src={room.image} 
                  alt={room.name[language]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 inline-block rounded-sm mb-3">
                    {room.type}
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-tight">
                    {room.name[language]}
                  </h3>
                  <div className="flex text-gold-400 mb-4">
                     {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  
                  {/* Expanded Content on Hover */}
                  <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                      {room.description[language]}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-white">${room.price}</span>
                        <span className="text-gray-400 text-xs ml-1">/ {t.pricePerNight}</span>
                      </div>
                      <Link 
                        to={`/room/${room.id}`}
                        className="bg-gold-500 text-navy-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-white transition-colors flex items-center gap-2"
                      >
                        {t.viewDetails} <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                  {/* Initial State (Visible when not hovering) */}
                  <div className="group-hover:hidden transition-all duration-300">
                     <div className="w-12 h-1 bg-gold-500 mb-2"></div>
                     <span className="text-white text-sm uppercase tracking-widest flex items-center gap-2">
                       Hover to explore
                     </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;