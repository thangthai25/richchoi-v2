import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_ROOMS, MOCK_SERVICES } from '../constants';
import { Star, Award, Users, Crown, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const presidentialRoom = MOCK_ROOMS.find(r => r.type === 'PRESIDENTIAL');
  // Show only first 3 rooms on Home
  const featuredRooms = MOCK_ROOMS.slice(0, 3);
  // Show only first 4 services on Home
  const featuredServices = MOCK_SERVICES.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
        >
          <div className="absolute inset-0 bg-navy-900/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1 text-gold-400">
              {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
            </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl tracking-wide">
            {t.welcome}
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 mb-12 font-light font-serif tracking-wider">
            {t.subtitle}
          </p>
          <Link to="/rooms" className="bg-gold-500 text-navy-900 px-10 py-4 rounded-sm font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg border border-gold-400 inline-block">
            {t.exploreRooms}
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-gold-500 z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-gold-500 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Hotel Lobby" 
                className="relative z-10 rounded-sm shadow-2xl w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              />
            </div>
            <div className="md:w-1/2">
              <span className="text-gold-600 font-bold tracking-[0.2em] text-sm uppercase mb-2 block">{t.aboutUs}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-8 leading-tight">{t.aboutTitle}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                {t.aboutDesc}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <Award className="text-gold-500 flex-shrink-0" size={32} />
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1">World Class</h4>
                    <p className="text-sm text-gray-500">Recognized globally for service excellence.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="text-gold-500 flex-shrink-0" size={32} />
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1">Personalized</h4>
                    <p className="text-sm text-gray-500">24/7 Butler service for every suite.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Presidential Signature Section */}
      {presidentialRoom && (
        <section className="py-24 bg-navy-900 text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <Crown className="mx-auto text-gold-500 mb-4" size={48} />
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">{t.signatureSuite}</h2>
              <p className="text-gold-100 max-w-2xl mx-auto font-light text-lg">{t.signatureDesc}</p>
            </div>
            
            <Link to={`/room/${presidentialRoom.id}`} className="block relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
                alt="Presidential Suite" 
                className="w-full h-[600px] object-cover rounded-sm shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-10 z-20">
                <div className="flex flex-col md:flex-row justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">{presidentialRoom.name[language]}</h3>
                    <p className="text-gray-300 max-w-xl">{presidentialRoom.description[language]}</p>
                  </div>
                  <span className="mt-6 md:mt-0 bg-gold-500 text-navy-900 px-8 py-3 rounded-sm font-bold hover:bg-white transition-colors">
                    {t.bookNow}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Featured Rooms Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto bg-slate-50">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-gold-600 font-bold tracking-widest text-sm uppercase">Accommodation</span>
            <h2 className="text-4xl font-serif font-bold text-navy-900 mt-2">{t.rooms}</h2>
            <div className="w-24 h-1 bg-gold-500 mt-6"></div>
          </div>
          <Link to="/rooms" className="text-navy-900 font-bold hover:text-gold-600 flex items-center gap-2">
            View All Rooms <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredRooms.map(room => (
            <Link to={`/room/${room.id}`} key={room.id} className="group bg-white rounded-t-xl hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 relative top-0 hover:-top-2">
              <div className="relative h-72 overflow-hidden rounded-t-xl">
                <img 
                  src={room.image} 
                  alt={room.name[language]} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-navy-900/90 backdrop-blur px-4 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-sm border border-gold-500">
                  {room.type}
                </div>
                {/* Hover Reveal Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="bg-white text-navy-900 px-6 py-2 rounded-full font-bold text-sm transform scale-90 group-hover:scale-100 transition-transform">
                     {t.viewDetails}
                   </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-navy-900 group-hover:text-gold-600 transition-colors mb-2">{room.name[language]}</h3>
                <div className="flex items-center gap-1 mb-4 text-gold-500">
                   {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed line-clamp-2 font-light">
                  {room.description[language]}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                  <div>
                    <span className="text-3xl font-serif font-bold text-navy-900">${room.price}</span>
                    <span className="text-gray-500 text-xs ml-1 uppercase tracking-wider">/ {t.pricePerNight}</span>
                  </div>
                  <span className="text-navy-900 font-bold uppercase text-xs tracking-wider group-hover:text-gold-600">
                    {t.bookNow}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-gold-500 font-bold tracking-widest text-sm uppercase">Amenities</span>
              <h2 className="text-4xl font-serif font-bold mt-2 text-white">{t.services}</h2>
            </div>
            <Link to="/services" className="text-gray-300 hover:text-white flex items-center gap-2">
              Explore All Services <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map(service => (
              <div key={service.id} className="relative group overflow-hidden rounded-sm aspect-[3/4]">
                <img src={service.image} alt={service.name[language]} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-gold-400 text-xs font-bold uppercase tracking-wider mb-2 block border-b border-gold-400 w-fit pb-1">{service.type}</span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{service.name[language]}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                    {service.description[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;