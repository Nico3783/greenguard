
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};
