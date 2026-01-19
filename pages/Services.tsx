import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_SERVICES } from '../constants';

const Services: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-navy-900 pb-20">
      {/* Header */}
      <div className="py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gold-400">{t.services}</h1>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto font-light">
          {language === 'EN' 
            ? "Indulge in a world of relaxation and refinement. Our services are curated to provide the ultimate luxury experience." 
            : "Đắm mình trong thế giới của sự thư giãn và tinh tế. Các dịch vụ của chúng tôi được tuyển chọn để mang lại trải nghiệm sang trọng tột bậc."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {MOCK_SERVICES.map((service, index) => (
          <div 
            key={service.id} 
            className={`flex flex-col md:flex-row items-center gap-12 mb-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 border border-gold-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src={service.image} 
                alt={service.name[language]} 
                className="w-full aspect-[4/3] object-cover rounded-lg shadow-2xl filter brightness-90 group-hover:brightness-100 transition-all duration-500"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 text-white">
               <span className="text-gold-500 text-sm font-bold tracking-[0.2em] uppercase mb-2 block">{service.type}</span>
               <h2 className="text-4xl font-serif font-bold mb-6">{service.name[language]}</h2>
               <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                 {service.description[language]}
               </p>
               <div className="flex items-center gap-6">
                 {service.price > 0 ? (
                   <span className="text-2xl font-serif text-white">${service.price}</span>
                 ) : (
                   <span className="text-2xl font-serif text-white">Complimentary</span>
                 )}
                 <button className="px-8 py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all rounded-sm uppercase tracking-wider text-sm font-bold">
                   Reserve
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;