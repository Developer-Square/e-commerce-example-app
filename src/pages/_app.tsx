import '../styles/global.css';

import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import logger from '@/config/logger';
import fetcher from '@/lib/swr/fetcher';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      fetcher,
      onError: (err) => {
        logger.error(err);
      },
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
);

export default MyApp;
