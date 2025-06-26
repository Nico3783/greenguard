
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Bell, Settings, Smartphone, HelpCircle, Menu, X, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState({ first_name: '', last_name: '' });
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserProfile(profile);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const displayName = userProfile.first_name && userProfile.last_name 
    ? `${userProfile.first_name} ${userProfile.last_name}`
    : user?.email || 'User';

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'History', path: '/dashboard/history' },
    { icon: Bell, label: 'Alerts', path: '/dashboard/alerts' },
    { icon: Smartphone, label: 'My Devices', path: '/dashboard/devices' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Help', path: '/dashboard/help' },
  ];

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={`bg-white border-r-2 border-green-100 shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      <div className="p-4 border-b border-green-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <NavLink to="/dashboard" className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/ed9d40fe-3c91-4866-bbc7-eff12084417f.png" 
                  alt="Green Guard Logo" 
                  className="w-8 h-8 object-contain bg-transparent"
                  style={{ backgroundColor: 'transparent' }}
                />
                <div>
                  <h2 className="text-xl font-bold text-green-600">Green Guard</h2>
                  <p className="text-sm text-green-600">{displayName}</p>
                </div>
              </NavLink>
            </div>
          )}
          {isCollapsed && (
            <NavLink to="/dashboard" className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/ed9d40fe-3c91-4866-bbc7-eff12084417f.png" 
                alt="Green Guard Logo" 
                className="w-8 h-8 object-contain bg-transparent"
                style={{ backgroundColor: 'transparent' }}
              />
            </NavLink>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-green-50 transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-green-600" />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-green-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Log Out</span>}
        </button>
      </div>
    </div>
  );
};
