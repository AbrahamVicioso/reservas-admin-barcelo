import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  CalendarCheck,
  Hotel,
  Menu,
  X,
  LogOut,
  Search,
  Bell,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/actividades', label: 'Actividades Recreativas', icon: Calendar },
  { path: '/reservas-actividades', label: 'Reservas Actividades', icon: CalendarCheck },
  { path: '/reservas', label: 'Reservas Habitaciones', icon: Hotel },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Azul marino oscuro minimalista */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Hotel className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-white font-medium text-lg tracking-tight">Barceló</h1>
                <p className="text-text-sidebar text-xs font-light opacity-60">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-text-sidebar hover:text-text-pale transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            <p className="text-text-sidebar text-xs font-light uppercase tracking-wider px-4 mb-4 opacity-40">
              Menú Principal
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-sidebar-selected text-text-pale'
                      : 'text-text-sidebar hover:bg-sidebar-hover hover:text-text-pale'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-light text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-6 py-6 border-t border-white/10">
            <p className="text-text-sidebar text-xs font-light text-center opacity-40">
              v1.0.0
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Header - Blanco limpio con sombra suave */}
        <header className="bg-card shadow-soft px-8 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Barra de búsqueda ocupa casi todo el centro */}
            <div className="flex-1 flex justify-center px-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 border border-border-card rounded-md focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 text-sm font-light"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 relative">
              {/* Notificaciones */}
              <button className="relative text-gray-500 hover:text-gray-800 transition-colors">
                <Bell className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger-notification rounded-full"></span>
              </button>

              {/* Mensajes */}
              <button className="relative text-gray-500 hover:text-gray-800 transition-colors">
                <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger-notification rounded-full"></span>
              </button>

              {/* Usuario */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-normal text-gray-800">{user?.email || 'Usuario'}</p>
                  <p className="text-xs text-gray-400 font-light">
                    {user?.isEmailConfirmed ? 'Email verificado' : 'Email pendiente'}
                  </p>
                </div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-soft hover:shadow-soft-md transition-all duration-200"
                >
                  <span className="text-white font-medium text-sm">
                    {user ? getInitials(user.email) : 'U'}
                  </span>
                </button>
              </div>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-12 mt-2 w-48 bg-card rounded-lg shadow-soft-lg border border-border-card py-1 z-20">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors font-light"
                    >
                      <LogOut className="w-4 h-4" strokeWidth={1.5} />
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content - Espaciado generoso */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
