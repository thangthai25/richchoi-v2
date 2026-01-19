import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock, Target } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen pb-20">
       {/* Header */}
       <div className="bg-navy-900 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold relative z-10">{t.aboutPageTitle}</h1>
        <p className="text-gold-400 mt-4 font-light tracking-widest relative z-10">RICHCHOI Luxury Hotels</p>
      </div>

      {/* Legacy Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                 <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Hotel History" className="rounded-lg shadow-2xl" />
            </div>
            <div>
                <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">{t.aboutTitle}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{t.aboutDesc}</p>
            </div>
        </div>
      </section>

       {/* History & Mission */}
       <section className="bg-slate-50 py-16">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-gold-500">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-6">
                    <Clock className="text-navy-900" size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">{t.aboutHistoryTitle}</h3>
                <p className="text-gray-600 leading-relaxed">{t.aboutHistoryDesc}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-gold-500">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-6">
                    <Target className="text-navy-900" size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">{t.aboutMissionTitle}</h3>
                <p className="text-gray-600 leading-relaxed">{t.aboutMissionDesc}</p>
            </div>
         </div>
       </section>

       {/* Values */}
       <section className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12">{t.valuesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                    <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-600 font-bold text-xl">01</div>
                    <h4 className="font-bold text-xl mb-2">{t.value1}</h4>
                    <p className="text-gray-500">{t.value1Desc}</p>
                </div>
                <div className="p-6">
                    <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-600 font-bold text-xl">02</div>
                    <h4 className="font-bold text-xl mb-2">{t.value2}</h4>
                    <p className="text-gray-500">{t.value2Desc}</p>
                </div>
                <div className="p-6">
                     <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-600 font-bold text-xl">03</div>
                    <h4 className="font-bold text-xl mb-2">{t.value3}</h4>
                    <p className="text-gray-500">{t.value3Desc}</p>
                </div>
            </div>
       </section>
    </div>
  );
};

export default About;