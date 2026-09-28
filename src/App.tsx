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
import { UserContext, AppUser, deriveDisplayName } from './context/UserContext';
import { supabase } from './lib/supabaseClient';

function loadUserFromStorage(): AppUser | null {
  try {
    const raw = localStorage.getItem('user');
    if (raw) return JSON.parse(raw) as AppUser;
  } catch {
    /* ignore */
  }
  return null;
}

export default function App() {
  const [user, setUserState] = useState<AppUser | null>(() => loadUserFromStorage());
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const displayName = user ? deriveDisplayName(user) : '';

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }, [user]);

  // Listen for Supabase Google OAuth callback
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata ?? {};
        const fullName: string = meta.full_name ?? meta.name ?? '';
        const email: string = session.user.email ?? '';
        const googlePhoto: string | undefined = meta.avatar_url ?? meta.picture ?? undefined;
        setUserState((prev) => {
          // If the existing user has an uploaded photo (data URL), that overrides the Google photo
          const isUploaded = Boolean(prev?.avatarUrl?.startsWith('data:'));
          const finalAvatar = isUploaded ? prev?.avatarUrl : (googlePhoto || prev?.avatarUrl);
          const finalName = fullName || prev?.name || '';
          return {
            name: finalName,
            email: email || prev?.email || '',
            avatarUrl: finalAvatar,
          };
        });
        window.location.hash = '#dashboard';
        setActiveTab('dashboard');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

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
      if (validTabs.includes(hash as TabType)) {
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

  const handleLoginSuccess = (name: string, email: string, avatarUrl?: string) => {
    const newUser: AppUser = { name, email, avatarUrl };
    setUserState(newUser);
    window.location.hash = '#dashboard';
    setActiveTab('dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut().catch(() => {});
    setUserState(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.hash = '#login';
    setIsProfileOpen(false);
  };

  const setUser = (u: AppUser | null) => setUserState(u);

  // If user is not logged in, show Login
  if (!user) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <UserContext.Provider value={{ user, displayName, setUser }}>
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
    </UserContext.Provider>
  );
}
