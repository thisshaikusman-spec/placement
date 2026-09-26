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
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('isLoggedIn'));
  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabType | 'login';
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
        // no tab change, login page will be rendered below
      } else if (validTabs.includes(hash)) {
        setActiveTab(hash);
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

  return (
    !isLoggedIn ? (
      <Login />
    ) : (
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
        />

        {/* Notifications Drawer */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onNavigate={handleTabChange}
        />
      </div>
    )
  );

}
