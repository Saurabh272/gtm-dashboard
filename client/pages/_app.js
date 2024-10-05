import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';
import GTMScript from '../utils/gtmScript';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const gtmID = process.env.NEXT_PUBLIC_GTM_ID || 'YOUR_GTM_ID';
const gtmURL = process.env.NEXT_PUBLIC_GTM_URL || 'https://www.googletagmanager.com';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.dataLayer.push({
        event: 'pageview',
        page: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <GTMScript gtmID={gtmID} gtmURL={gtmURL} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;