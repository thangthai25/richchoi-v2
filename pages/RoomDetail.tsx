import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ROOMS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, Check, Users, Maximize, CalendarDays, ArrowLeft, Wifi, Coffee, Tv, Shield } from 'lucide-react';
import { Room } from '../types';

const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const room = MOCK_ROOMS.find(r => r.id === id);

  // Booking State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [showPaymentQR, setShowPaymentQR] = useState(false);

  const calculateTotal = useMemo(() => {
    if (!checkIn || !checkOut || !room) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays * room.price;
  }, [checkIn, checkOut, room]);

  if (!room) {
    return <div className="min-h-screen flex items-center justify-center text-navy-900">Room not found</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[70vh]">
        <img src={room.image} alt={room.name[language]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link to="/rooms" className="text-white/80 hover:text-gold-400 flex items-center gap-2 mb-6 transition-colors">
              <ArrowLeft size={20} /> {t.backToRooms}
            </Link>
            <span className="bg-gold-500 text-navy-900 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
              {room.type}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mt-4 drop-shadow-lg">
              {room.name[language]}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-8 border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="text-gold-500" />
              <span>{room.capacity} {t.capacity}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Maximize className="text-gold-500" />
              <span>120 m²</span>
            </div>
            <div className="flex items-center gap-1 text-gold-500">
              {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
            </div>
          </div>

          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">{t.roomOverview}</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-12 font-light">
            {room.description[language]}
          </p>

          <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">{t.amenities}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {room.amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span>{item[language]}</span>
              </div>
            ))}
             <div className="flex items-center gap-3 text-gray-700"><Wifi size={18} className="text-gold-500"/> High-speed Wifi</div>
             <div className="flex items-center gap-3 text-gray-700"><Coffee size={18} className="text-gold-500"/> Coffee Machine</div>
             <div className="flex items-center gap-3 text-gray-700"><Tv size={18} className="text-gold-500"/> 4K Smart TV</div>
             <div className="flex items-center gap-3 text-gray-700"><Shield size={18} className="text-gold-500"/> Safe Box</div>
          </div>
        </div>

        {/* Right Sticky Booking Panel */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 p-8 rounded-xl shadow-lg border border-gray-200 sticky top-24">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-gray-500 text-sm">Start from</span>
                <div className="text-3xl font-serif font-bold text-navy-900">${room.price}</div>
              </div>
              <span className="text-gray-500 text-sm mb-1">/ {t.pricePerNight}</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2 block">{t.checkIn}</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2 block">{t.checkOut}</label>
                 <div className="relative">
                  <CalendarDays className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {calculateTotal > 0 && (
              <div className="border-t border-gray-200 pt-4 mb-6">
                 <div className="flex justify-between text-navy-900 font-bold text-lg">
                   <span>{t.total}</span>
                   <span>${calculateTotal}</span>
                 </div>
                 <p className="text-xs text-gray-500 mt-1 text-right">Includes taxes & fees</p>
              </div>
            )}

            {!showPaymentQR ? (
              <button 
                onClick={() => {
                  if(!checkIn || !checkOut) return alert('Please select dates');
                  setShowPaymentQR(true);
                }}
                className="w-full bg-navy-900 text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-navy-900 transition-all"
              >
                {t.proceedToPay}
              </button>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-4 border border-gold-200 rounded-lg mb-4 flex justify-center">
                   <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RICHCHOI_BOOK_${room.id}_${calculateTotal}`} 
                      alt="Payment QR"
                      className="w-40 h-40" 
                    />
                </div>
                <p className="text-center text-sm text-gray-500 mb-4">{t.scanQR}</p>
                <button 
                  onClick={() => { alert(t.paymentSuccess); setShowPaymentQR(false); }}
                  className="w-full bg-green-700 text-white py-3 rounded-sm font-bold flex items-center justify-center gap-2"
                >
                  <Check size={18} /> Confirm Payment
                </button>
                <button 
                  onClick={() => setShowPaymentQR(false)}
                  className="w-full mt-2 text-gray-500 text-sm hover:text-navy-900"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;