import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { UserRole } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    if (role === UserRole.ADMIN) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-navy-900 p-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gold-400">RICHCHOI Luxury Hotels</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => handleLogin(UserRole.GUEST)}
              className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-all group"
            >
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gold-200">
                <User className="text-gray-600 group-hover:text-gold-700" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-navy-900">{t.guestLogin}</h3>
                <p className="text-xs text-gray-500">Book rooms & access services</p>
              </div>
            </button>

            <button
              onClick={() => handleLogin(UserRole.ADMIN)}
              className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-navy-900 hover:bg-slate-50 transition-all group"
            >
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-navy-200">
                <Shield className="text-gray-600 group-hover:text-navy-900" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-navy-900">{t.adminLogin}</h3>
                <p className="text-xs text-gray-500">Manage hotel operations</p>
              </div>
            </button>
          </div>
          
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-2">{t.noAccount}</p>
            <Link to="/signup" className="text-navy-900 font-bold hover:text-gold-600 hover:underline">
              {t.createAccount}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;