import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, ArrowRight, Menu, X, Plus, Minus, 
  Heart, Leaf, Flame, ShieldCheck, ChevronRight, 
  TrendingUp, CreditCard, Wallet, Calendar,
  Settings, List, Trash2, Instagram, Users, Lock, LogOut, UserPlus, Download, CheckCircle,
  Edit, Ban, Check, Utensils, Upload, Image as ImageIcon, MapPin
} from 'lucide-react';

// --- INITIAL CONSTANTS ---
const CATEGORIES = ["All", "Classic Parathas", "Student Combos", "Beverages"];

const INITIAL_MENU = [
  {
    id: 1,
    name: "Classic Aloo Paratha",
    description: "Mashed potatoes blended with roasted cumin, green chillies, and fresh coriander.",
    price: 80,
    category: "Classic Parathas",
    image: "https://images.unsplash.com/photo-1626779836967-0c7f3e8211db?auto=format&fit=crop&q=80&w=600&h=400",
    tags: ["Best Seller"],
    inStock: true
  },
  {
    id: 2,
    name: "Paneer Pyaz Paratha",
    description: "Grated fresh cottage cheese with finely chopped onions and special secret spices.",
    price: 110,
    category: "Classic Parathas",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600&h=400",
    tags: ["High Protein"],
    inStock: true
  }
];

const ADDONS = [
  { id: 'a1', name: "Extra White Butter", price: 20 },
  { id: 'a2', name: "Fresh Curd (Katori)", price: 30 },
  { id: 'a3', name: "Extra Green Chutney", price: 10 },
  { id: 'a4', name: "Mango Pickle", price: 10 },
];

// --- STABLE SUB-COMPONENTS ---

const Navigation = ({ contactDetails, setCurrentView, currentView, currentUser, setCurrentUser, setAuthMode, setShowAuthModal, cartItemCount, setIsCartOpen }) => (
  <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 h-20 flex items-center justify-between">
    <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentView('home')}>
      <img src={contactDetails.logo} className="w-10 h-10 rounded-full border-2 border-orange-100 object-cover" alt="logo" />
      <div className="flex flex-col">
        <span className="text-xl font-bold text-zinc-900 leading-none">Dadi Maa Ke</span>
        <span className="text-xs font-bold text-orange-600 tracking-widest uppercase">Parathe</span>
      </div>
    </div>
    <div className="hidden md:flex items-center space-x-8">
      {['Menu', 'Meal Pass', 'About'].map(v => (
        <button key={v} onClick={() => setCurrentView(v.toLowerCase().replace(' ', ''))} className={`text-sm font-medium transition-colors ${currentView === v.toLowerCase().replace(' ', '') ? 'text-orange-600' : 'text-zinc-500 hover:text-orange-600'}`}>{v}</button>
      ))}
    </div>
    <div className="flex items-center space-x-4">
      <button onClick={() => setCurrentView('admin')} className="text-xs flex items-center gap-1 text-zinc-400 font-medium hover:text-zinc-900 transition-colors">
        <Lock className="w-3 h-3"/> Admin
      </button>
      {currentUser ? (
        <button onClick={() => setCurrentUser(null)} className="text-zinc-500 hover:text-rose-500 transition-colors" title="Logout"><LogOut className="w-5 h-5"/></button>
      ) : (
        <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="text-sm font-bold text-zinc-700 hover:text-orange-600 transition-colors">Login</button>
      )}
      <button onClick={() => setIsCartOpen(true)} className="relative p-2 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-colors">
        <ShoppingBag className="w-5 h-5 text-zinc-900"/>
        {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{cartItemCount}</span>}
      </button>
    </div>
  </nav>
);

const Hero = ({ contactDetails, setCurrentView }) => (
  <div className="flex flex-col items-center pt-24 pb-16 px-6 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
      <Flame className="w-4 h-4" />
      <span>Hot & Fresh in Indore</span>
    </div>
    <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight leading-[1.1] mb-6">
      The Comfort of Home, <br className="hidden md:block" />
      <span className="text-orange-600">Delivered.</span>
    </h1>
    <p className="text-lg md:text-xl text-zinc-500 mb-10 max-w-2xl leading-relaxed">
      Premium, whole-wheat stuffed parathas crafted with grandmother's secret recipes. Because you deserve more than just fast food.
    </p>
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-12">
      <button 
        onClick={() => setCurrentView('menu')}
        className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-semibold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center space-x-2 group shadow-xl shadow-zinc-900/20"
      >
        <span>Explore Menu</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      <button 
        onClick={() => setCurrentView('mealpass')}
        className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 rounded-full font-semibold text-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all"
      >
        View Meal Pass
      </button>
    </div>
    <div className="w-48 h-48 md:w-64 md:h-64 relative">
        <img src={contactDetails.logo} alt="Dadi Maa" className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl animate-in zoom-in duration-1000" />
        <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-3xl shadow-xl flex items-center space-x-2 border border-orange-50">
           <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
           <span className="font-bold text-zinc-800 text-sm">Homemade</span>
        </div>
    </div>
  </div>
);

const MenuSection = ({ setSelectedCategory, selectedCategory, filteredMenu, setSelectedItemForAddon, isAdminAuthenticated, onDirectEdit }) => (
  <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
      <div>
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Our Menu</h2>
        <p className="text-zinc-500">Authentic recipes, premium ingredients.</p>
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category 
                ? 'bg-zinc-900 text-white shadow-md' 
                : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredMenu.map(item => {
        const isOutOfStock = item.inStock === false;
        return (
          <div key={item.id} className={`group bg-white rounded-3xl overflow-hidden border border-zinc-100 transition-all duration-300 ${isOutOfStock ? 'opacity-80' : 'hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]'}`}>
            <div className="relative h-56 overflow-hidden bg-zinc-100">
              {isAdminAuthenticated && (
                <button
                  onClick={(e) => { e.stopPropagation(); onDirectEdit(item); }}
                  className="absolute top-4 right-4 bg-white shadow-lg p-2.5 rounded-xl text-blue-600 hover:bg-blue-50 z-20 transition-all hover:scale-110 border border-blue-100 flex items-center gap-2"
                  title="Edit this item"
                >
                  <Edit className="w-4 h-4" /> <span className="text-xs font-bold">Edit</span>
                </button>
              )}
              {item.image ? (
                <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-70' : 'group-hover:scale-105'}`} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-200"><Utensils className="w-16 h-16"/></div>
              )}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-red-600 text-white px-4 py-1.5 font-bold rounded-xl transform -rotate-12 text-lg shadow-xl border border-red-400/50 tracking-widest uppercase">Out of Stock</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-zinc-900">{item.name}</h3>
                <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
              </div>
              <p className="text-zinc-500 text-sm mb-6 line-clamp-2">{item.description}</p>
              <button disabled={isOutOfStock} onClick={() => setSelectedItemForAddon(item)} className={`w-full py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${isOutOfStock ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-zinc-50 hover:bg-orange-50 hover:text-orange-700 text-zinc-900'}`}>
                {isOutOfStock ? <span>Currently Unavailable</span> : <><Plus className="w-4 h-4" /><span>Add to Order</span></>}
              </button>
            </div>
          </div>
        );
      })}
      {filteredMenu.length === 0 && (
        <div className="col-span-full text-center py-20 text-zinc-400">
          No items found in this category.
        </div>
      )}
    </div>
  </div>
);

const MealPassView = ({ handleSubscribe }) => (
  <div className="max-w-4xl mx-auto px-6 py-16 animate-in fade-in duration-500">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-zinc-900 mb-4">Monthly Meal Pass</h2>
      <p className="text-lg text-zinc-500 max-w-xl mx-auto">Ghar ka khana, har roz discounted rate par.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm flex flex-col">
        <div className="mb-8">
          <span className="text-orange-600 font-semibold text-sm uppercase">Standard Pass</span>
          <div className="mt-4 flex items-baseline text-5xl font-extrabold text-zinc-900">₹2,499<span className="text-xl font-medium text-zinc-400">/mo</span></div>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
          <li className="flex items-center space-x-3 text-zinc-700"><ShieldCheck className="w-5 h-5 text-green-500"/><span>1 Premium Paratha per day</span></li>
          <li className="flex items-center space-x-3 text-zinc-700"><ShieldCheck className="w-5 h-5 text-green-500"/><span>Choice of any Beverage</span></li>
        </ul>
        <button onClick={() => handleSubscribe('Standard Pass')} className="w-full py-4 bg-zinc-100 text-zinc-900 rounded-xl font-semibold hover:bg-zinc-200 transition-colors">Subscribe Now</button>
      </div>
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-2xl flex flex-col text-white border border-zinc-800">
        <div className="mb-8">
          <span className="text-orange-400 font-semibold text-sm uppercase">Heavy Diet Pass</span>
          <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">₹3,999<span className="text-xl font-medium text-zinc-400">/mo</span></div>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
          <li className="flex items-center space-x-3 text-zinc-300"><ShieldCheck className="w-5 h-5 text-orange-400"/><span>2 Premium Parathas per day</span></li>
          <li className="flex items-center space-x-3 text-zinc-300"><ShieldCheck className="w-5 h-5 text-orange-400"/><span>Curd & Beverage included</span></li>
        </ul>
        <button onClick={() => handleSubscribe('Heavy Diet Pass')} className="w-full py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20">Subscribe Now</button>
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-in fade-in duration-700">
    <h2 className="text-4xl font-bold mb-8 text-zinc-900">Humari Kahani</h2>
    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100 text-left space-y-6">
      <p className="text-zinc-600 text-lg leading-relaxed">
        <span className="text-zinc-900 font-bold italic">Dadi Maa Ke Parathe</span> sirf ek cloud kitchen nahi, Indore ke students aur professionals ke liye ghar ka ek tukda hai. 
      </p>
      <p className="text-zinc-600 text-lg leading-relaxed">
        Hum har ek parathe ko grandmother's authentic recipe se banate hain, jisme fresh ingredients aur pure wheat flour ka istemal hota hai. Humara maqsad hai aapko wahi sukoon dena jo ghar ke bane khane mein hota hai.
      </p>
      <div className="pt-6 border-t border-zinc-100 text-orange-600 font-bold text-xl">
        "Ghar se door, par ghar ke swaad ke bilkul paas."
      </div>
    </div>
  </div>
);

const AdminLogin = ({ onLogin, onCancel }) => {
  const [pwd, setPwd] = useState('');
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
        <div className="bg-orange-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
        <p className="text-zinc-500 text-sm mb-8">Secure dashboard for Dadi Maa Ke Parathe.</p>
        
        <input 
          type="password" 
          value={pwd} 
          onChange={e => setPwd(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && onLogin(pwd)}
          className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-white mb-6 outline-none focus:border-orange-500 text-center text-lg tracking-widest" 
          placeholder="Enter Password" 
        />
        
        <button onClick={() => onLogin(pwd)} className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl hover:bg-orange-500 transition-colors mb-4">
          Unlock Dashboard
        </button>
        <button onClick={onCancel} className="text-zinc-500 hover:text-white transition-colors text-sm font-medium">
          Return to Website
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ 
  setCurrentView, visitors, menuItems, setMenuItems, 
  mealPassSubscribers, registeredUsers, contactDetails, 
  setContactDetails, downloadData, setIsAdminAuthenticated,
  orders, setOrders, adminEditItem, setAdminEditItem
}) => {
  const [tab, setTab] = useState('overview');
  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Classic Parathas', description: '', image: '', tags: '' });
  const [editId, setEditId] = useState(null);
  const menuFileInputRef = useRef(null);
  const settingsFileInputRef = useRef(null);

  useEffect(() => {
    if (adminEditItem) {
      setTab('managemenu');
      setNewItem({
        name: adminEditItem.name,
        price: adminEditItem.price,
        category: adminEditItem.category,
        description: adminEditItem.description || '',
        image: adminEditItem.image || '',
        tags: adminEditItem.tags ? adminEditItem.tags.join(', ') : ''
      });
      setEditId(adminEditItem.id);
      setAdminEditItem(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [adminEditItem]);

  const handleFileChange = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveItem = (e) => {
    e.preventDefault();
    const tagsArray = typeof newItem.tags === 'string' ? newItem.tags.split(',').map(t => t.trim()) : newItem.tags;
    
    if (editId) {
      // Edit existing item
      setMenuItems(menuItems.map(item => item.id === editId ? { ...item, ...newItem, price: Number(newItem.price), tags: tagsArray } : item));
      setEditId(null);
      alert("Item update ho gaya!");
    } else {
      // Add new item
      const item = { ...newItem, id: Date.now(), price: Number(newItem.price), tags: tagsArray, inStock: true };
      setMenuItems([item, ...menuItems]);
      alert("Naya item menu me add ho gaya!");
    }
    setNewItem({ name: '', price: '', category: 'Classic Parathas', description: '', image: '', tags: '' });
    if (menuFileInputRef.current) menuFileInputRef.current.value = "";
  };

  const startEdit = (item) => {
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description || '',
      image: item.image || '',
      tags: item.tags ? item.tags.join(', ') : ''
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleStock = (id) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, inStock: item.inStock === false ? true : false } : item));
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 p-8 animate-in fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-white"/>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white leading-tight">Admin Central</h2>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Dadi Maa Ke Parathe</p>
            </div>
          </div>
          <button onClick={logoutAdmin} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all">
            <LogOut className="w-4 h-4"/> Lock & Exit
          </button>
        </div>

        <div className="flex space-x-6 border-b border-zinc-800 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {['Overview', 'Recent Orders', 'Manage Menu', 'Meal Passes', 'User Logins', 'Settings'].map(t => (
            <button key={t} onClick={() => setTab(t.toLowerCase().replace(' ', ''))} className={`pb-4 text-sm font-medium whitespace-nowrap transition-colors ${tab === t.toLowerCase().replace(' ', '') ? 'text-orange-500 border-b-2 border-orange-500' : 'hover:text-white'}`}>{t}</button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {[
              { label: 'Total Sales', val: `₹${orders.reduce((sum, o) => sum + o.total, 0)}`, icon: <Wallet className="text-green-500"/> },
              { label: 'Total Expense', val: '₹0', icon: <CreditCard className="text-rose-500"/> },
              { label: 'Pending Orders', val: orders.filter(o => o.status === 'Pending').length.toString(), icon: <Calendar className="text-orange-500"/> },
              { label: 'Live Visitors', val: visitors.toLocaleString(), icon: <Users className="text-blue-500"/> }
            ].map(stat => (
              <div key={stat.label} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <div className="flex justify-between mb-2 text-xs uppercase tracking-wider text-zinc-500">{stat.label} {stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.val}</div>
              </div>
            ))}
            <div className="md:col-span-4 bg-zinc-900 p-10 rounded-2xl border border-zinc-800 text-center">
                <p className="text-zinc-500">Aapke sabhi orders 'Recent Orders' tab mein dikhenge.</p>
            </div>
          </div>
        )}

        {tab === 'recentorders' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold">Recent Orders</h3>
              <button onClick={() => downloadData(orders, "orders_history")} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors">
                <Download className="w-4 h-4"/> Download CSV
              </button>
            </div>
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-zinc-950 text-xs text-zinc-500 uppercase">
                  <tr>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Order Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {orders.map(o => (
                    <tr key={o.id} className="border-t border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                      <td className="p-4 text-zinc-400">
                        <div className="text-white font-medium">{o.date}</div>
                        <div className="text-xs">{o.time}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{o.customerName}</div>
                        <div className="text-xs text-zinc-500">{o.customerPhone}</div>
                      </td>
                      <td className="p-4 max-w-[200px]">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="text-xs text-zinc-400 mb-1 leading-snug">
                            <span className="text-white font-medium">{item.quantity}x {item.name}</span>
                            {item.addons?.length > 0 && ` (+ ${item.addons.map(a => a.name).join(', ')})`}
                          </div>
                        ))}
                      </td>
                      <td className="p-4 text-orange-400 font-bold">₹{o.total}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => setOrders(orders.map(ord => ord.id === o.id ? { ...ord, status: ord.status === 'Pending' ? 'Completed' : 'Pending' } : ord))}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${o.status === 'Pending' ? 'bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 border border-orange-500/20' : 'bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/20'}`}
                        >
                          {o.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && <div className="p-10 text-center text-zinc-600">Abhi tak koi order nahi aaya hai.</div>}
            </div>
          </div>
        )}

        {tab === 'managemenu' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <form onSubmit={saveItem} className={`p-6 rounded-2xl border grid grid-cols-1 md:grid-cols-2 gap-4 transition-colors ${editId ? 'bg-orange-950/20 border-orange-500/50' : 'bg-zinc-900 border-zinc-800'}`}>
              <div className="md:col-span-2 mb-2 flex justify-between items-center">
                <h3 className="text-white font-bold">{editId ? 'Update Paratha Details' : 'Add New Paratha'}</h3>
                {newItem.image && (
                   <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-700">
                     <img src={newItem.image} className="w-full h-full object-cover" alt="Preview" />
                   </div>
                )}
              </div>
              <input placeholder="Item Name" required className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-orange-500" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
              <input placeholder="Price (₹)" type="number" required className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-orange-500" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
              <select className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-orange-500" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              
              <div className="flex gap-2">
                <input placeholder="Image URL (Optional)" className="flex-1 bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-orange-500" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
                <button 
                  type="button"
                  onClick={() => menuFileInputRef.current.click()}
                  className="bg-zinc-800 p-3 rounded-xl text-zinc-300 hover:text-white transition-colors"
                  title="Upload from Device"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <input 
                  type="file" 
                  ref={menuFileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, (data) => setNewItem({...newItem, image: data}))} 
                />
              </div>

              <input placeholder="Description" className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl md:col-span-2 text-white outline-none focus:border-orange-500" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
              <input placeholder="Tags (comma separated, Optional)" className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl md:col-span-2 text-white outline-none focus:border-orange-500" value={newItem.tags} onChange={e => setNewItem({...newItem, tags: e.target.value})} />
              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="flex-1 bg-orange-600 text-white p-3 rounded-xl font-bold hover:bg-orange-500 transition-colors">
                  {editId ? 'Update Item' : 'Add to Menu'}
                </button>
                {editId && (
                  <button type="button" onClick={() => { setEditId(null); setNewItem({ name: '', price: '', category: 'Classic Parathas', description: '', image: '', tags: '' }); }} className="bg-zinc-800 text-white p-3 rounded-xl font-bold hover:bg-zinc-700 transition-colors px-6">
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <div className="space-y-3">
              {menuItems.map(m => (
                <div key={m.id} className={`p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center border gap-4 transition-opacity ${m.inStock === false ? 'bg-zinc-900/50 border-red-900/50 opacity-75' : 'bg-zinc-900 border-zinc-800'}`}>
                  <div className="flex items-center space-x-4">
                    {m.image ? (
                      <img src={m.image} className={`w-12 h-12 rounded-lg object-cover bg-zinc-800 ${m.inStock === false ? 'grayscale' : ''}`} alt="item" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-600"><Utensils className="w-6 h-6"/></div>
                    )}
                    <div>
                      <div className="text-white font-bold flex items-center gap-2">
                        {m.name} 
                        {m.inStock === false && <span className="text-[10px] bg-red-600/20 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full">Out of Stock</span>}
                      </div>
                      <div className="text-xs text-zinc-400">₹{m.price} • {m.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                    <button onClick={() => toggleStock(m.id)} className={`flex items-center gap-1 text-xs px-3 py-2 rounded-lg font-bold transition-colors ${m.inStock === false ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}>
                      {m.inStock === false ? <Check className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      <span className="hidden sm:inline">{m.inStock === false ? 'Mark In-Stock' : 'Mark Out of Stock'}</span>
                    </button>
                    <button onClick={() => startEdit(m)} className="text-zinc-400 hover:text-blue-500 transition-colors p-2 bg-zinc-800 rounded-lg" title="Edit Item"><Edit className="w-4 h-4"/></button>
                    <button onClick={() => setMenuItems(menuItems.filter(i => i.id !== m.id))} className="text-zinc-400 hover:text-rose-500 transition-colors p-2 bg-zinc-800 rounded-lg" title="Delete Item"><Trash2 className="w-4 h-4"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'mealpasses' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold">Meal Pass Subscriptions</h3>
              <button onClick={() => downloadData(mealPassSubscribers, "meal_passes")} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors">
                <Download className="w-4 h-4"/> Download CSV
              </button>
            </div>
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-zinc-950 text-xs">
                  <tr><th className="p-4">Name</th><th className="p-4">Plan</th><th className="p-4">Phone</th><th className="p-4">Status</th></tr>
                </thead>
                <tbody className="text-sm">
                  {mealPassSubscribers.map(s => (
                    <tr key={s.id} className="border-t border-zinc-800">
                      <td className="p-4 text-white font-medium">{s.name}</td>
                      <td className="p-4 text-orange-400">{s.plan}</td>
                      <td className="p-4">{s.phone}</td>
                      <td className="p-4"><span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs border border-green-500/20">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {mealPassSubscribers.length === 0 && <div className="p-10 text-center text-zinc-600">No meal pass entries yet.</div>}
            </div>
          </div>
        )}

        {tab === 'userlogins' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold">Registered User Accounts</h3>
              <button onClick={() => downloadData(registeredUsers, "user_accounts")} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors">
                <Download className="w-4 h-4"/> Download CSV
              </button>
            </div>
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-zinc-950 text-xs text-zinc-500 uppercase">
                  <tr><th className="p-4">User Name</th><th className="p-4">Phone (Login ID)</th><th className="p-4">Password</th></tr>
                </thead>
                <tbody className="text-sm">
                  {registeredUsers.map(u => (
                    <tr key={u.id} className="border-t border-zinc-800">
                      <td className="p-4 text-white font-medium">{u.name}</td>
                      <td className="p-4">{u.phone}</td>
                      <td className="p-4 font-mono text-orange-400">{u.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {registeredUsers.length === 0 && <div className="p-10 text-center text-zinc-600">No users registered yet.</div>}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-xl space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold">General Settings</h3>
              <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700">
                 <img src={contactDetails.logo} className="w-full h-full object-cover" alt="Logo Preview" />
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="text-xs mb-1 block uppercase text-zinc-500">WhatsApp Number</label><input className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-white outline-none focus:border-orange-500" value={contactDetails.phone} onChange={e => setContactDetails({...contactDetails, phone: e.target.value})} /></div>
              <div><label className="text-xs mb-1 block uppercase text-zinc-500">Instagram Handle URL</label><input className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-white outline-none focus:border-orange-500" value={contactDetails.instagram} onChange={e => setContactDetails({...contactDetails, instagram: e.target.value})} /></div>
              <div><label className="text-xs mb-1 block uppercase text-zinc-500">Shop Location / Address</label><input className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-white outline-none focus:border-orange-500" value={contactDetails.address} onChange={e => setContactDetails({...contactDetails, address: e.target.value})} placeholder="e.g. Vijay Nagar, Indore" /></div>
              
              <div>
                <label className="text-xs mb-1 block uppercase text-zinc-500">Logo Image URL</label>
                <div className="flex gap-2">
                  <input className="flex-1 bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-white outline-none focus:border-orange-500" value={contactDetails.logo} onChange={e => setContactDetails({...contactDetails, logo: e.target.value})} />
                  <button 
                    type="button" 
                    onClick={() => settingsFileInputRef.current.click()}
                    className="bg-zinc-800 p-3 rounded-xl text-zinc-300 hover:text-white transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                  <input 
                    type="file" 
                    ref={settingsFileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, (data) => setContactDetails({...contactDetails, logo: data}))} 
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-6 pt-4 border-t border-zinc-800">
                <button onClick={() => alert("Settings saved locally!")} className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors">Save Settings</button>
                <button onClick={() => { if(window.confirm('Kya aap sach me menu ko default par reset karna chahte hain? Naye items delete ho jayenge.')) { setMenuItems(INITIAL_MENU); alert('Menu Reset ho gaya!'); } }} className="bg-red-600/20 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl font-bold hover:bg-red-600/30 transition-colors">Reset Menu to Default</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  // Global View States
  const [currentView, setCurrentView] = useState('home'); 
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // --- PERSISTENT STATE MANAGEMENT (LOCAL STORAGE) ---
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('dm_menu_v2');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });
  
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('dm_users_v2');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [mealPassSubscribers, setMealPassSubscribers] = useState(() => {
    const saved = localStorage.getItem('dm_passes_v2');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [contactDetails, setContactDetails] = useState(() => {
    const saved = localStorage.getItem('dm_settings_v2');
    return saved ? JSON.parse(saved) : {
      phone: "919876543210",
      email: "admin@dadimake.com",
      logo: "dadi.jpg",
      instagram: "https://instagram.com/dadimake_parathe",
      address: "Vijay Nagar, Indore, MP"
    };
  });

  const [visitors, setVisitors] = useState(() => {
    return parseInt(localStorage.getItem('dm_visitors_v2') || '0');
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dm_orders_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // --- LOCAL EFFECTS TO SAVE DATA ---
  useEffect(() => { localStorage.setItem('dm_menu_v2', JSON.stringify(menuItems)); }, [menuItems]);
  useEffect(() => { localStorage.setItem('dm_users_v2', JSON.stringify(registeredUsers)); }, [registeredUsers]);
  useEffect(() => { localStorage.setItem('dm_passes_v2', JSON.stringify(mealPassSubscribers)); }, [mealPassSubscribers]);
  useEffect(() => { localStorage.setItem('dm_settings_v2', JSON.stringify(contactDetails)); }, [contactDetails]);
  useEffect(() => { localStorage.setItem('dm_orders_v2', JSON.stringify(orders)); }, [orders]);

  useEffect(() => {
    if (!sessionStorage.getItem('visited_session_v2')) {
      const newCount = visitors + 1;
      setVisitors(newCount);
      localStorage.setItem('dm_visitors_v2', newCount.toString());
      sessionStorage.setItem('visited_session_v2', 'true');
    }
  }, []);

  // Application States
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [pendingPlan, setPendingPlan] = useState(null);
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const [authForm, setAuthForm] = useState({ name: '', phone: '', password: '' });

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItemForAddon, setSelectedItemForAddon] = useState(null);
  const [currentAddons, setCurrentAddons] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [adminEditItem, setAdminEditItem] = useState(null);

  const handleDirectEdit = (item) => {
    setAdminEditItem(item);
    setCurrentView('admin');
  };

  // Filter & Cart Logic
  const filteredMenu = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const cartTotal = cart.reduce((total, item) => {
    const addonsTotal = (item.addons || []).reduce((sum, a) => sum + a.price, 0);
    return total + (item.price + addonsTotal) * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Admin CSV Download
  const downloadData = (data, filename) => {
    if (data.length === 0) {
      alert("No data to download!");
      return;
    }
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(item => Object.values(item).join(",")).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubscribe = (plan) => {
    if (!currentUser) {
      setPendingPlan(plan);
      setShowAuthModal(true);
    } else {
      const newSub = {
        id: Date.now(),
        name: currentUser.name,
        plan: plan,
        phone: currentUser.phone,
        startDate: new Date().toLocaleDateString(),
        status: "Active"
      };
      setMealPassSubscribers(prev => [...prev, newSub]);
      alert(`Mubarak ho! Aapka ${plan} activate ho gaya hai.`);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'signup') {
      if (registeredUsers.some(u => u.phone === authForm.phone)) {
        alert("Yeh number pehle se registered hai! Kripya login karein.");
        setAuthMode('login');
        return;
      }
      const newUser = { id: Date.now(), ...authForm };
      setRegisteredUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
    } else {
      const user = registeredUsers.find(u => u.phone === authForm.phone && u.password === authForm.password);
      if (user) {
        setCurrentUser(user);
      } else {
        alert("Galat phone number ya password!");
        return;
      }
    }
    setShowAuthModal(false);
    setAuthForm({ name: '', phone: '', password: '' });
    if (pendingPlan) {
      setTimeout(() => handleSubscribe(pendingPlan), 500);
      setPendingPlan(null);
    } else if (pendingCheckout) {
      setTimeout(() => setIsCartOpen(true), 500);
      setPendingCheckout(false);
    }
  };

  const addToCart = () => {
    if (!selectedItemForAddon) return;
    const newItem = {
      ...selectedItemForAddon,
      cartItemId: Date.now(),
      quantity: 1,
      addons: currentAddons
    };
    setCart(prev => [...prev, newItem]);
    setSelectedItemForAddon(null);
    setCurrentAddons([]);
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.cartItemId === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const handleWhatsAppCheckout = () => {
    if (!currentUser) {
      alert("Order place karne ke liye kripya pehle Login ya Sign Up karein.");
      setIsCartOpen(false);
      setPendingCheckout(true);
      setShowAuthModal(true);
      return;
    }

    let msg = "Hi Dadi Maa Ke Parathe! 👋\nNaya Order:\n";
    cart.forEach(item => {
      msg += `\n*${item.quantity}x ${item.name}*`;
      if (item.addons.length) msg += `\n   + Addons: ${item.addons.map(a => a.name).join(', ')}`;
    });
    msg += `\n\n*Total Bill: ₹${cartTotal}*`;
    window.open(`https://wa.me/${contactDetails.phone}?text=${encodeURIComponent(msg)}`, '_blank');

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      items: [...cart],
      total: cartTotal,
      status: 'Pending'
    };
    setOrders([newOrder, ...orders]);

    setCart([]);
    setOrderSuccess(true);
  };

  const handleAdminLogin = (password) => {
    if (password === 'admin123') {
      setIsAdminAuthenticated(true);
    } else {
      alert("Incorrect Admin Password!");
    }
  };

  if (currentView === 'admin' && !isAdminAuthenticated) {
    return <AdminLogin onLogin={handleAdminLogin} onCancel={() => setCurrentView('home')} />;
  }

  return (
    <div className={`min-h-screen ${currentView === 'admin' ? 'bg-zinc-950' : 'bg-[#FAFAFA]'} font-sans selection:bg-orange-100 selection:text-orange-900`}>
      {currentView !== 'admin' && (
        <Navigation 
          contactDetails={contactDetails}
          setCurrentView={setCurrentView} 
          currentView={currentView} 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser} 
          setAuthMode={setAuthMode} 
          setShowAuthModal={setShowAuthModal} 
          cartItemCount={cartItemCount} 
          setIsCartOpen={setIsCartOpen} 
        />
      )}
      
      <main>
        {currentView === 'home' && <Hero contactDetails={contactDetails} setCurrentView={setCurrentView} />}
        {currentView === 'menu' && (
          <MenuSection 
            setSelectedCategory={setSelectedCategory} 
            selectedCategory={selectedCategory} 
            filteredMenu={filteredMenu} 
            setSelectedItemForAddon={setSelectedItemForAddon} 
            isAdminAuthenticated={isAdminAuthenticated}
            onDirectEdit={handleDirectEdit}
          />
        )}
        {currentView === 'mealpass' && <MealPassView handleSubscribe={handleSubscribe} />}
        {currentView === 'about' && <About />}
        {currentView === 'admin' && (
          <AdminDashboard 
            setCurrentView={setCurrentView} 
            visitors={visitors} 
            menuItems={menuItems} 
            setMenuItems={setMenuItems} 
            mealPassSubscribers={mealPassSubscribers} 
            registeredUsers={registeredUsers} 
            contactDetails={contactDetails} 
            setContactDetails={setContactDetails} 
            downloadData={downloadData} 
            setIsAdminAuthenticated={setIsAdminAuthenticated}
            orders={orders}
            setOrders={setOrders}
            adminEditItem={adminEditItem}
            setAdminEditItem={setAdminEditItem}
          />
        )}
      </main>

      {currentView !== 'admin' && (
        <footer className="py-12 border-t border-zinc-100 bg-white mt-auto">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-500 text-sm">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-2 text-zinc-900 font-bold">
                 <MapPin className="w-4 h-4 text-orange-600" />
                 <span>Location: {contactDetails.address}</span>
              </div>
              <p>&copy; 2026 Dadi Maa Ke Parathe. All rights reserved.</p>
              <p className="flex items-center">Designed by <span className="font-bold text-zinc-900 ml-1">Hardik Solanki</span></p>
            </div>
            <div className="flex space-x-6">
              <a href={contactDetails.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-600 font-bold transition-colors"><Instagram className="w-5 h-5"/> Instagram</a>
            </div>
          </div>
        </footer>
      )}

      {/* --- MODALS --- */}
      {selectedItemForAddon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedItemForAddon(null)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 animate-in slide-in-from-bottom-10 duration-300">
            {/* Title Color Fix */}
            <h3 className="text-2xl font-bold mb-1 text-zinc-900">{selectedItemForAddon.name}</h3>
            <p className="text-zinc-500 text-sm mb-6">Extra swaad add karein!</p>
            <div className="space-y-3 mb-8">
              {ADDONS.map(a => (
                <div 
                  key={a.id} 
                  onClick={() => setCurrentAddons(prev => prev.find(x => x.id === a.id) ? prev.filter(x => x.id !== a.id) : [...prev, a])} 
                  className={`p-4 rounded-2xl border-2 flex justify-between cursor-pointer transition-all ${
                    currentAddons.find(x => x.id === a.id) 
                      ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold' 
                      : 'border-zinc-100 hover:border-zinc-200 text-zinc-800' // Text visibility fix
                  }`}
                >
                  <span className="font-medium">{a.name}</span>
                  <span className="font-bold">+₹{a.price}</span>
                </div>
              ))}
            </div>
            <button onClick={addToCart} className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20">Add to Cart</button>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => { setIsCartOpen(false); setOrderSuccess(false); }}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-8 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-zinc-900">{orderSuccess ? 'Order Status' : 'Your Cart'}</h2>
              <button onClick={() => { setIsCartOpen(false); setOrderSuccess(false); }} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"><X className="w-5 h-5 text-zinc-900"/></button>
            </div>
            
            {orderSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">Order Placed Successfully!</h3>
                  <p className="text-zinc-500">Aapka order receive ho gaya hai. Hum jaldi hi WhatsApp par aapko confirmation bhejenge.</p>
                </div>
                <button onClick={() => { setIsCartOpen(false); setOrderSuccess(false); setCurrentView('menu'); }} className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-colors w-full">
                  Back to Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-6">
                  {cart.map(item => (
                    <div key={item.cartItemId} className="flex justify-between border-b border-zinc-50 pb-4">
                      <div>
                        {/* Cart Item Name Color Fix */}
                        <div className="font-bold text-zinc-900">{item.name}</div>
                        <div className="text-xs text-zinc-500">
                          {item.addons.map(a => a.name).join(', ')}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)} className="p-1.5 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors text-zinc-900"><Minus className="w-3 h-3"/></button>
                        <span className="font-bold w-4 text-center text-zinc-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)} className="p-1.5 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors text-zinc-900"><Plus className="w-3 h-3"/></button>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && <div className="text-center py-20 text-zinc-400 flex flex-col items-center gap-4"><ShoppingBag className="w-12 h-12 opacity-20" /><p>Bhukh lagi hai? Order karo!</p></div>}
                </div>
                {cart.length > 0 && (
                  <div className="pt-6 border-t border-zinc-100">
                    <div className="flex justify-between mb-6 text-2xl font-bold text-zinc-900"><span>Total</span><span>₹{cartTotal}</span></div>
                    <button onClick={handleWhatsAppCheckout} className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20">
                      Checkout on WhatsApp
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
             <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"><X className="w-4 h-4 text-zinc-900"/></button>
            <h3 className="text-2xl font-bold mb-2 text-zinc-900">{authMode === 'login' ? 'Welcome Back!' : 'Ghar Jaisa Swagat!'}</h3>
            <p className="text-zinc-500 text-sm mb-6">{authMode === 'login' ? 'Login karein apna subscription dekhne ke liye.' : 'Account banayein aur Meal Pass activate karein.'}</p>
            <div className="space-y-4">
              {authMode === 'signup' && <input required placeholder="Aapka Naam" className="w-full border border-zinc-200 p-4 rounded-2xl outline-none focus:border-orange-500 transition-all text-zinc-900" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} />}
              <input required placeholder="Phone Number (User ID)" className="w-full border border-zinc-200 p-4 rounded-2xl outline-none focus:border-orange-500 transition-all text-zinc-900" value={authForm.phone} onChange={e => setAuthForm({...authForm, phone: e.target.value})} />
              <input required type="password" placeholder="Password" className="w-full border border-zinc-200 p-4 rounded-2xl outline-none focus:border-orange-500 transition-all text-zinc-900" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} />
              <button onClick={handleAuthSubmit} className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-all">
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-zinc-500">{authMode === 'login' ? "Account nahi hai?" : "Account hai?"} <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-orange-600 font-bold underline ml-1">{authMode === 'login' ? 'Sign Up' : 'Login'}</button></p>
          </div>
        </div>
      )}
    </div>
  );
}