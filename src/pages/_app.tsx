/* eslint-disable import/no-extraneous-dependencies */
import '../styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import logger from '@/config/logger';
import fetcher from '@/lib/swr/fetcher';

config.autoAddCss = false;

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
