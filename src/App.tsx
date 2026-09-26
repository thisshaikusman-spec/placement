import { useState, useEffect } from 'react';
import Login from './pages/Login';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { DsaPractice } from './components/DsaPractice';
import { MockInterview } from './components/MockInterview';
import { Analytics } from './components/Analytics';
import { CompanyDecoders } from './components/CompanyDecoders';
import { PeerPod } from './components/PeerPod';
import { FailureReplay } from './components/FailureReplay';
import { ProfileModal } from './components/ProfileModal';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hashString = window.location.hash;
      setCurrentHash(hashString);
      const hash = hashString.replace('#', '') as TabType | 'login';
      const validTabs: TabType[] = [
        'dashboard',
        'dsa-practice',
        'mock-interview',
        'analytics',
        'company-decoders',
        'peer-pod',
        'failure-replay',
      ];
      if (hash === 'login') {
        // Handled by auth gate
      } else if (validTabs.includes(hash as TabType)) {
        setActiveTab(hash as TabType);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setCurrentHash('#dashboard');
    window.location.hash = '#dashboard';
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setCurrentHash('#login');
    window.location.hash = '#login';
    setIsProfileOpen(false);
  };

  // If user is not logged in or explicitly at #login
  if (!isLoggedIn || currentHash === '#login') {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Fixed Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16">
        {activeTab === 'dashboard' && <Dashboard onNavigate={handleTabChange} />}
        {activeTab === 'dsa-practice' && <DsaPractice />}
        {activeTab === 'mock-interview' && <MockInterview onNavigate={handleTabChange} />}
        {activeTab === 'analytics' && <Analytics onNavigate={handleTabChange} />}
        {activeTab === 'company-decoders' && <CompanyDecoders onNavigate={handleTabChange} />}
        {activeTab === 'peer-pod' && <PeerPod />}
        {activeTab === 'failure-replay' && <FailureReplay />}
      </main>

      {/* Global Footer */}
      <Footer onTabChange={handleTabChange} />

      {/* Profile Dialog */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onNavigateToDecoders={() => handleTabChange('company-decoders')}
        onLogout={handleLogout}
      />

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleTabChange}
      />
    </div>
  );
}
