import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, Phone, User as UserIcon } from 'lucide-react';

const SignUp: React.FC = () => {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-navy-900 p-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-2">{t.createAccount}</h2>
          <p className="text-gold-400">Join RICHCHOI Membership</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-bold text-navy-900">{t.fullName}</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:border-gold-500 focus:outline-none"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-navy-900">{t.email}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:border-gold-500 focus:outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-navy-900">{t.phoneNumber}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="phone"
                type="tel"
                placeholder="+84 ..."
                className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:border-gold-500 focus:outline-none"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-navy-900">{t.password}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:border-gold-500 focus:outline-none"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-navy-900">{t.confirmPassword}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 p-3 border border-gray-300 rounded-sm focus:border-gold-500 focus:outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-navy-900 text-white py-3 rounded-sm font-bold hover:bg-gold-500 hover:text-navy-900 transition-colors mt-4 flex items-center justify-center gap-2"
          >
            <UserPlus size={20} /> {t.signUp}
          </button>

          <div className="text-center mt-6">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gold-600 font-medium">
              {t.haveAccount} {t.login}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;