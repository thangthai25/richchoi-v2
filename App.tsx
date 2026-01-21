import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, Globe, Shield } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { useLanguage } from './contexts/LanguageContext';
import { UserRole } from './types';

// Pages
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Services from './pages/Services';
import About from './pages/About';
import ChatBot from './components/ChatBot';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-40 bg-navy-900/95 backdrop-blur-sm text-white border-b border-gold-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-gold-500 rounded-sm flex items-center justify-center">
              <span className="font-serif text-navy-900 font-bold text-2xl">R</span>
            </div>
            <Link to="/" className="font-serif text-2xl tracking-widest font-bold text-gold-400">RICHCHOI</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/about" className="hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.aboutPageTitle}</Link>
              <Link to="/rooms" className="hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.rooms}</Link>
              <Link to="/services" className="hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.services}</Link>
              {user?.role === UserRole.ADMIN && (
                 <Link to="/admin" className="hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.dashboard}</Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'VN' : 'EN')}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-gold-400 transition-colors"
            >
              <Globe size={16} />
              {language}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gold-400 font-serif italic">Welcome, {user.name}</span>
                <button onClick={logout} className="text-gray-300 hover:text-white">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="text-white px-4 py-2 rounded-sm font-bold text-sm hover:text-gold-400 transition-all">
                  {t.login}
                </Link>
                <Link to="/signup" className="bg-gold-500 text-navy-900 px-6 py-2 rounded-sm font-bold text-sm hover:bg-gold-400 transition-all">
                  {t.signUp}
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
             <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">{t.aboutPageTitle}</Link>
             <Link to="/rooms" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">{t.rooms}</Link>
             <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">{t.services}</Link>
             {user?.role === UserRole.ADMIN && (
                 <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">{t.dashboard}</Link>
             )}
             {user ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left text-gray-300 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium w-full">
                  {t.logout}
                </button>
             ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gold-400 block px-3 py-2 rounded-md text-base font-medium">{t.login}</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium">{t.signUp}</Link>
                </>
             )}
              <button 
              onClick={() => { setLanguage(language === 'EN' ? 'VN' : 'EN'); setIsMenuOpen(false); }}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-gold-400 px-3 py-2"
            >
              <Globe size={16} />
              Switch Language ({language})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-navy-900 text-white py-12 border-t border-gold-600/30">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-gold-400 mb-4">RICHCHOI</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{t.footerDesc}</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-wider text-gold-400">{t.contact}</h4>
          <p className="text-gray-400 text-sm mb-2">{t.address}</p>
          <p className="text-gray-400 text-sm">thangthai6009@gmail.com</p>
          <p className="text-gray-400 text-sm">+84 963285951</p>
        </div>
        <div>
           <h4 className="font-bold mb-4 uppercase text-sm tracking-wider text-gold-400">Connect</h4>
           <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all cursor-pointer">FB</div>
             <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all cursor-pointer">IG</div>
             <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all cursor-pointer">TW</div>
           </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} RICHCHOI Luxury Hotels. All rights reserved.
      </div>
    </footer>
  );
};

const Layout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-slate-50">
    <Navbar />
    <main className="flex-grow pt-20">
      <Outlet />
    </main>
    <ChatBot />
    <Footer />
  </div>
);

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="room/:id" element={<RoomDetail />} />
          <Route path="services" element={<Services />} />
          <Route 
            path="admin" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;