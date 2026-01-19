import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_ROOMS, MOCK_SERVICES, MOCK_PARTNERS } from '../constants';
import { BedDouble, Users, Briefcase, Plus, Trash2, Edit, Utensils, ToggleLeft, ToggleRight, Phone, Mail, Calendar, DollarSign, TrendingUp, PieChart, Save, X, Image as ImageIcon } from 'lucide-react';
import { Room, Service, Partner } from '../types';

type Tab = 'ROOMS' | 'SERVICES' | 'PARTNERS' | 'CUSTOMERS';

const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { allUsers, toggleUserStatus, deleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('ROOMS');
  
  // Local state for management (mocking CRUD)
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [partners, setPartners] = useState<Partner[]>(MOCK_PARTNERS);

  // Modal State for Rooms
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomForm, setRoomForm] = useState<Partial<Room> & { amenitiesEn: string, amenitiesVn: string }>({
    name: { EN: '', VN: '' },
    description: { EN: '', VN: '' },
    price: 0,
    capacity: 2,
    image: '',
    type: 'DELUXE',
    amenitiesEn: '',
    amenitiesVn: ''
  });

  // Derived Statistics
  const stats = useMemo(() => {
    const total = rooms.length;
    const booked = rooms.filter(r => !r.available).length;
    const available = total - booked;
    const occupancy = total > 0 ? Math.round((booked / total) * 100) : 0;
    
    // Revenue simulation
    const dailyRevenue = rooms.filter(r => !r.available).reduce((acc, curr) => acc + curr.price, 0);
    const monthlyRevenue = dailyRevenue * 30; // Simulated projection
    const yearlyRevenue = monthlyRevenue * 12; // Simulated projection

    return { total, booked, available, occupancy, dailyRevenue, monthlyRevenue, yearlyRevenue };
  }, [rooms]);

  // Handlers
  const handleDeleteRoom = (id: string) => {
    if(confirm('Are you sure you want to delete this room?')) setRooms(rooms.filter(r => r.id !== id));
  };

  const toggleRoomAvailability = (id: string) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, available: !r.available } : r));
  };

  const openAddRoomModal = () => {
    setEditingRoom(null);
    setRoomForm({
      name: { EN: '', VN: '' },
      description: { EN: '', VN: '' },
      price: 0,
      capacity: 2,
      image: 'https://picsum.photos/800/600',
      type: 'DELUXE',
      available: true,
      amenitiesEn: '',
      amenitiesVn: ''
    });
    setIsRoomModalOpen(true);
  };

  const openEditRoomModal = (room: Room) => {
    setEditingRoom(room);
    setRoomForm({
      ...room,
      amenitiesEn: room.amenities.map(a => a.EN).join(', '),
      amenitiesVn: room.amenities.map(a => a.VN).join(', ')
    });
    setIsRoomModalOpen(true);
  };

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse Amenities
    const amenitiesListEn = roomForm.amenitiesEn.split(',').map(s => s.trim()).filter(s => s);
    const amenitiesListVn = roomForm.amenitiesVn.split(',').map(s => s.trim()).filter(s => s);
    
    // Zip them together, defaulting to EN if VN missing
    const finalAmenities = amenitiesListEn.map((en, i) => ({
      EN: en,
      VN: amenitiesListVn[i] || en
    }));

    const roomData: Room = {
      id: editingRoom ? editingRoom.id : Date.now().toString(),
      name: { EN: roomForm.name!.EN, VN: roomForm.name!.VN },
      description: { EN: roomForm.description!.EN, VN: roomForm.description!.VN },
      price: Number(roomForm.price),
      capacity: Number(roomForm.capacity),
      image: roomForm.image || '',
      type: roomForm.type as any,
      available: editingRoom ? editingRoom.available : true,
      amenities: finalAmenities
    };

    if (editingRoom) {
      setRooms(rooms.map(r => r.id === editingRoom.id ? roomData : r));
    } else {
      setRooms([...rooms, roomData]);
    }
    setIsRoomModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'ROOMS':
        return (
          <div className="space-y-6">
            {/* Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">{t.totalRooms}</p>
                  <p className="text-2xl font-serif font-bold text-navy-900">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><BedDouble size={20}/></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">{t.availableRooms}</p>
                  <p className="text-2xl font-serif font-bold text-green-600">{stats.available}</p>
                </div>
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center"><CheckCircleIcon size={20}/></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">{t.bookedRooms}</p>
                  <p className="text-2xl font-serif font-bold text-red-600">{stats.booked}</p>
                </div>
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center"><Calendar size={20}/></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">{t.occupancyRate}</p>
                  <p className="text-2xl font-serif font-bold text-gold-600">{stats.occupancy}%</p>
                </div>
                <div className="w-10 h-10 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center"><PieChart size={20}/></div>
              </div>
            </div>

            {/* Revenue Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-navy-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                 <div className="absolute right-0 top-0 opacity-10 p-4"><DollarSign size={64} /></div>
                 <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">{t.revenue} ({t.daily})</p>
                 <h3 className="text-3xl font-serif font-bold">${stats.dailyRevenue.toLocaleString()}</h3>
                 <p className="text-gray-400 text-xs mt-2 flex items-center gap-1"><TrendingUp size={12}/> Based on booked rooms</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{t.revenue} ({t.monthly})</p>
                 <h3 className="text-3xl font-serif font-bold text-navy-900">${stats.monthlyRevenue.toLocaleString()}</h3>
                 <p className="text-gray-400 text-xs mt-2 italic">Projected</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{t.revenue} ({t.yearly})</p>
                 <h3 className="text-3xl font-serif font-bold text-navy-900">${stats.yearlyRevenue.toLocaleString()}</h3>
                 <p className="text-gray-400 text-xs mt-2 italic">Projected</p>
               </div>
            </div>

            {/* Rooms Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-navy-900">{t.roomManagement}</h3>
                <button onClick={openAddRoomModal} className="bg-navy-900 text-white px-4 py-2 rounded-sm text-sm flex items-center gap-2 hover:bg-gold-500 hover:text-navy-900 transition-colors">
                  <Plus size={16} /> {t.addRoom}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 font-bold">Image</th>
                      <th className="p-4 font-bold">Name (EN/VN)</th>
                      <th className="p-4 font-bold">Type</th>
                      <th className="p-4 font-bold">Price</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rooms.map(room => (
                      <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                         <td className="p-4">
                           <img src={room.image} alt="Room" className="w-16 h-12 object-cover rounded shadow-sm" />
                         </td>
                        <td className="p-4 font-medium text-navy-900">
                          <div>{room.name.EN}</div>
                          <div className="text-xs text-gray-500">{room.name.VN}</div>
                          <div className="text-xs text-gold-600 mt-1 italic">{room.amenities.length} amenities</div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{room.type}</span>
                        </td>
                        <td className="p-4 font-bold">${room.price}</td>
                        <td className="p-4">
                          <button 
                            onClick={() => toggleRoomAvailability(room.id)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                              room.available 
                              ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                              : 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200'
                            }`}
                          >
                            {room.available ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                            {room.available ? t.availableRooms : t.bookedRooms}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => openEditRoomModal(room)} className="text-gray-400 hover:text-blue-600 mx-2"><Edit size={18} /></button>
                          <button onClick={() => handleDeleteRoom(room.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'SERVICES':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-navy-900">Service Management</h3>
              <button className="bg-navy-900 text-white px-4 py-2 rounded-sm text-sm flex items-center gap-2 hover:bg-gold-500 hover:text-navy-900 transition-colors">
                <Plus size={16} /> Add Service
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {services.map(service => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                  <img src={service.image} alt={service.name.EN} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-bold text-navy-900">{service.name.EN}</h4>
                    <span className="text-xs text-gray-500 uppercase">{service.type}</span>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{service.description.EN}</p>
                    <div className="mt-2 text-gold-600 font-bold">${service.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'PARTNERS':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
            <h3 className="font-bold text-lg text-navy-900 mb-6">Partner Network</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {partners.map(p => (
                 <div key={p.id} className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-gold-400 transition-colors cursor-pointer">
                   <img src={p.logo} alt={p.name} className="w-16 h-16 rounded-full mb-3 grayscale hover:grayscale-0 transition-all" />
                   <h4 className="font-bold text-sm text-center">{p.name}</h4>
                   <span className="text-xs text-gray-500">{p.category}</span>
                 </div>
               ))}
               <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold-400 transition-colors cursor-pointer text-gray-400 hover:text-gold-500">
                 <Plus size={32} />
                 <span className="text-xs font-bold mt-2">Add Partner</span>
               </div>
            </div>
          </div>
        );
      case 'CUSTOMERS':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-navy-900">{t.userManagement}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4 font-bold">User</th>
                    <th className="p-4 font-bold">Contact</th>
                    <th className="p-4 font-bold">Role</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                           <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-gray-200" />
                           <div>
                             <div className="font-bold text-navy-900">{user.name}</div>
                             <div className="text-xs text-gray-500 flex items-center gap-1">
                               <Calendar size={10} /> Joined: {user.joinedDate || 'N/A'}
                             </div>
                           </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2 mb-1"><Mail size={14} /> {user.email}</div>
                        <div className="flex items-center gap-2"><Phone size={14} /> {user.phone || 'N/A'}</div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                         <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                           <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                           {user.isActive ? t.active : t.inactive}
                         </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => toggleUserStatus(user.id)}
                          className="text-gray-500 hover:text-gold-600 mx-2 text-xs font-bold underline"
                        >
                          {t.toggleStatus}
                        </button>
                        {user.role !== 'ADMIN' && (
                           <button onClick={() => deleteUser(user.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <div className="p-12 text-center text-gray-500">Module under development by backend team.</div>;
    }
  };

  // Icon component helper (defined outside if reused, but here for simplicity)
  const CheckCircleIcon = ({size}: {size: number}) => (
     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">{t.adminPanel}</h1>
        <p className="text-gray-500">Manage rooms, bookings, services, and hotel partners.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <button 
              onClick={() => setActiveTab('ROOMS')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ROOMS' ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <BedDouble size={18} /> {t.rooms}
            </button>
            <button 
              onClick={() => setActiveTab('SERVICES')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'SERVICES' ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Utensils size={18} /> Services
            </button>
            <button 
              onClick={() => setActiveTab('PARTNERS')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'PARTNERS' ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Briefcase size={18} /> {t.partners}
            </button>
            <button 
              onClick={() => setActiveTab('CUSTOMERS')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'CUSTOMERS' ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Users size={18} /> {t.customers}
            </button>
          </div>
          
          <div className="mt-6 bg-gold-50 rounded-xl p-4 border border-gold-200">
            <h4 className="font-bold text-gold-800 mb-2 text-sm">System Status</h4>
            <div className="flex items-center gap-2 text-xs text-green-700 mb-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Backend: Online
            </div>
            <div className="flex items-center gap-2 text-xs text-green-700 mb-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Database: Connected
            </div>
            <div className="flex items-center gap-2 text-xs text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> AI Bot: Active
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>

      {/* Add/Edit Room Modal */}
      {isRoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-navy-900 text-white rounded-t-xl">
              <h3 className="font-bold text-xl">{editingRoom ? t.editRoom : t.addRoom}</h3>
              <button onClick={() => setIsRoomModalOpen(false)} className="hover:text-gold-400"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSaveRoom} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-bold text-navy-900 mb-1">{t.roomNameEn}</label>
                   <input type="text" required className="w-full p-2 border rounded-sm" value={roomForm.name?.EN} onChange={e => setRoomForm({...roomForm, name: {...roomForm.name!, EN: e.target.value}})} />
                </div>
                <div>
                   <label className="block text-sm font-bold text-navy-900 mb-1">{t.roomNameVn}</label>
                   <input type="text" required className="w-full p-2 border rounded-sm" value={roomForm.name?.VN} onChange={e => setRoomForm({...roomForm, name: {...roomForm.name!, VN: e.target.value}})} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                   <label className="block text-sm font-bold text-navy-900 mb-1">Type</label>
                   <select className="w-full p-2 border rounded-sm" value={roomForm.type} onChange={e => setRoomForm({...roomForm, type: e.target.value as any})}>
                     <option value="DELUXE">DELUXE</option>
                     <option value="SUITE">SUITE</option>
                     <option value="PRESIDENTIAL">PRESIDENTIAL</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-navy-900 mb-1">Price ($)</label>
                   <input type="number" required className="w-full p-2 border rounded-sm" value={roomForm.price} onChange={e => setRoomForm({...roomForm, price: Number(e.target.value)})} />
                </div>
                <div>
                   <label className="block text-sm font-bold text-navy-900 mb-1">Capacity</label>
                   <input type="number" required className="w-full p-2 border rounded-sm" value={roomForm.capacity} onChange={e => setRoomForm({...roomForm, capacity: Number(e.target.value)})} />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-1 flex items-center gap-2"><ImageIcon size={16}/> {t.imageUrl}</label>
                <input type="text" required className="w-full p-2 border rounded-sm font-mono text-sm" value={roomForm.image} onChange={e => setRoomForm({...roomForm, image: e.target.value})} />
                {roomForm.image && <img src={roomForm.image} alt="Preview" className="h-20 mt-2 rounded object-cover border" />}
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-navy-900 mb-1">{t.descEn}</label>
                    <textarea required className="w-full p-2 border rounded-sm h-24 text-sm" value={roomForm.description?.EN} onChange={e => setRoomForm({...roomForm, description: {...roomForm.description!, EN: e.target.value}})}></textarea>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-navy-900 mb-1">{t.descVn}</label>
                    <textarea required className="w-full p-2 border rounded-sm h-24 text-sm" value={roomForm.description?.VN} onChange={e => setRoomForm({...roomForm, description: {...roomForm.description!, VN: e.target.value}})}></textarea>
                 </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-1">Amenities (EN) <span className="text-gray-400 font-normal text-xs">- {t.amenitiesHelp}</span></label>
                <textarea className="w-full p-2 border rounded-sm h-16 text-sm" placeholder="Wifi, Pool, Breakfast..." value={roomForm.amenitiesEn} onChange={e => setRoomForm({...roomForm, amenitiesEn: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-1">Amenities (VN)</label>
                <textarea className="w-full p-2 border rounded-sm h-16 text-sm" placeholder="Wifi, Bể bơi, Bữa sáng..." value={roomForm.amenitiesVn} onChange={e => setRoomForm({...roomForm, amenitiesVn: e.target.value})}></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                 <button type="button" onClick={() => setIsRoomModalOpen(false)} className="px-6 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 text-gray-700">{t.cancel}</button>
                 <button type="submit" className="px-6 py-2 bg-navy-900 text-white rounded-sm hover:bg-gold-500 hover:text-navy-900 transition-colors flex items-center gap-2">
                   <Save size={18} /> {t.save}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;