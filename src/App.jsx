import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import Layout from './components/Layout';
import AnimatedCursor from './components/common/AnimatedCursor';
import LoadingScreen from './components/common/LoadingScreen';
import ScrollProgress from './components/common/ScrollProgress';
import ParticleBackground from './components/effects/ParticleBackground';
import MagneticCursor from './components/common/MagneticCursor';
import Notifications from './components/common/Notifications';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <ParticleBackground />
          <MagneticCursor />
          <ScrollProgress />
          <Notifications />
          <Layout />
        </Suspense>
      </Router>
    </I18nextProvider>
  );
}

export default App;
