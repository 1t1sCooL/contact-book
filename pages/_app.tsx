import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered', reg.scope))
        .catch(err => console.error('SW failed', err));
    }
  }, []);
  return <Component {...pageProps} />;
}
export default App;
