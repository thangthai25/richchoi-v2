import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_SERVICES } from '../constants';
import { Check, X, CalendarDays, Clock, ShieldCheck } from 'lucide-react';
import { Service } from '../types';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  
  // State quản lý việc đặt dịch vụ
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleClose = () => {
    setSelectedService(null);
    setShowQR(false);
    setBookingDate('');
    setBookingTime('');
  };

  const handleConfirm = () => {
    if (!bookingDate || !bookingTime) {
      alert(language === 'EN' ? 'Please select date and time' : 'Vui lòng chọn ngày và giờ');
      return;
    }
    setShowQR(true);
  };

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
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 border border-gold-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src={service.image} 
                alt={service.name[language]} 
                className="w-full aspect-[4/3] object-cover rounded-lg shadow-2xl filter brightness-90 group-hover:brightness-100 transition-all duration-500"
              />
            </div>

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
                 <button 
                  onClick={() => setSelectedService(service)}
                  className="px-8 py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all rounded-sm uppercase tracking-wider text-sm font-bold"
                 >
                   Reserve
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Đặt lịch & Thanh toán */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gold-400">
            {/* Header Modal */}
            <div className="bg-navy-900 p-6 flex justify-between items-center text-white">
              <div>
                <h3 className="font-serif font-bold text-xl text-gold-400">{selectedService.name[language]}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{selectedService.type}</p>
              </div>
              <button onClick={handleClose} className="hover:text-gold-400 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {!showQR ? (
                <div className="space-y-6">
                  {/* Chọn ngày */}
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase mb-2 tracking-tighter">{t.checkIn} (Date)</label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-3 text-gold-600" size={18} />
                      <input 
                        type="date" 
                        className="w-full pl-10 p-3 border border-gray-200 rounded-sm focus:border-gold-500 focus:outline-none text-sm"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Chọn giờ */}
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase mb-2 tracking-tighter">Preferred Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 text-gold-600" size={18} />
                      <select 
                        className="w-full pl-10 p-3 border border-gray-200 rounded-sm focus:border-gold-500 focus:outline-none text-sm appearance-none"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                      >
                        <option value="">Select a time slot</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="19:00">07:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center mb-6">
                    <span className="font-bold text-navy-900">{t.total}</span>
                    <span className="text-2xl font-serif font-bold text-navy-900">
                      {selectedService.price > 0 ? `$${selectedService.price}` : 'Free'}
                    </span>
                  </div>

                  <button 
                    onClick={handleConfirm}
                    className="w-full bg-navy-900 text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-navy-900 transition-all shadow-lg"
                  >
                    {selectedService.price > 0 ? t.proceedToPay : 'Book Now'}
                  </button>
                </div>
              ) : (
                <div className="text-center animate-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-4 border-2 border-gold-100 rounded-lg mb-6 inline-block mx-auto">
                     <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=RICHCHOI_SERVICE_${selectedService.id}_${bookingDate}`} 
                        alt="Payment QR"
                        className="w-40 h-40" 
                      />
                  </div>
                  <p className="text-sm text-gray-500 mb-6">{t.scanQR}</p>
                  
                  <div className="bg-green-50 p-4 rounded-lg flex items-start gap-3 text-left mb-6">
                    <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
                    <p className="text-xs text-green-800 leading-tight">
                      {language === 'EN' 
                        ? "Your booking is secured. Please complete the transfer to finalize your reservation." 
                        : "Yêu cầu của bạn đã được ghi nhận. Vui lòng hoàn tất chuyển khoản để xác nhận lịch hẹn."}
                    </p>
                  </div>

                  <button 
                    onClick={() => { alert(t.paymentSuccess); handleClose(); }}
                    className="w-full bg-green-700 text-white py-3 rounded-sm font-bold flex items-center justify-center gap-2"
                  >
                    <Check size={18} /> Confirm Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;