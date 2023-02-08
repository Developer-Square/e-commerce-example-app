/* eslint-disable import/no-extraneous-dependencies */
import "../styles/global.css";
import "../styles/shop.css";
import "../styles/about-us.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";

config.autoAddCss = false;

// interface CustomAppProps extends AppProps {
//   pageProps: any;
// }

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
