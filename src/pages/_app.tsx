import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { FactoriesProvider } from '../contexts/FactoriesContext';
import FactoryProductionManager from '@/components/FactoryProductionManager';
import { ToastContainer } from 'react-toastify';
import { useFactories } from '../contexts/FactoriesContext';
import 'react-toastify/dist/ReactToastify.css';
import '../../src/HexagonGrid.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FactoriesProvider>
      <FactoryProductionManager >
        <Component {...pageProps} />
        <ToastContainer />
      </FactoryProductionManager>
    </FactoriesProvider>
  );
}
