/* eslint-disable import/no-extraneous-dependencies */
import '../styles/global.css';
import '../styles/shop.css';
import '../styles/about-us.css';
import '../styles/map.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
