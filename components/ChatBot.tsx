import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { generateHotelResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MOCK_ROOMS, MOCK_SERVICES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const ChatBot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: t.typeMessage, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateHotelResponse(input, MOCK_ROOMS, MOCK_SERVICES);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gold-500 hover:bg-gold-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center justify-center"
        >
          <MessageCircle size={28} />
          <span className="ml-2 font-serif hidden md:inline">{t.chatAssistant}</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-[90vw] md:w-96 h-[600px] flex flex-col overflow-hidden border border-gold-400">
          {/* Header */}
          <div className="bg-navy-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="text-gold-400" />
              <div>
                <h3 className="font-serif font-bold text-lg">RICHCHOI Concierge</h3>
                <p className="text-xs text-gold-400">Always at your service</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-navy-900 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.typeMessage}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold-400 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white p-2 rounded-full disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;