import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AdsenseAd } from './components/AdsenseAd';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { ADSENSE_CLIENT_ID, ADSENSE_SLOT_IDS } from './constants/adsense';
import { menuRoutes, supplementalRoutes } from './constants/routes';

const AppLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f4f6ff] via-[#f9fbff] to-[#eef4ff] text-slate-800 font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 -left-32 h-80 w-80 rounded-full bg-[#9be7fb]/60 blur-3xl" />
        <div className="absolute top-1/4 right-[-12%] h-[340px] w-[340px] rounded-full bg-[#fbc2eb]/50 blur-[80px]" />
        <div className="absolute bottom-[-18%] left-[20%] h-[420px] w-[420px] rounded-full bg-[#c7d8ff]/60 blur-[100px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navigation />
        <ScrollToTop />

        <aside className="fixed left-10 top-24 hidden w-[160px] 2xl:block">
          <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/50 backdrop-blur-xl">
            <AdsenseAd
              client={ADSENSE_CLIENT_ID}
              slot={ADSENSE_SLOT_IDS.sidebar}
              style={{ width: '160px', height: '600px' }}
            />
          </div>
        </aside>
        <aside className="fixed right-10 top-24 hidden w-[160px] 2xl:block">
          <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/50 backdrop-blur-xl">
            <AdsenseAd
              client={ADSENSE_CLIENT_ID}
              slot={ADSENSE_SLOT_IDS.sidebar}
              style={{ width: '160px', height: '600px' }}
            />
          </div>
        </aside>

        <div className="flex-grow">
          <div className="w-full px-4 py-12 sm:px-6 lg:px-8 2xl:px-[220px]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/60 p-6 backdrop-blur-3xl sm:p-10">
              <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-b-[32px] bg-gradient-to-b from-white/70 via-white/40 to-transparent" />
              <div className="relative">
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {menuRoutes.map(({ key, element, index, path }) =>
          index ? (
            <Route key={key} index element={element} />
          ) : (
            <Route key={key} path={path} element={element} />
          ),
        )}
        {supplementalRoutes.map(({ key, path, element }) => (
          <Route key={key} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
