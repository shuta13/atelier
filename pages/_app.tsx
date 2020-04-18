import "../assets/style/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <>
    <Head>
      <title>did0es - Learn WebGL</title>
    </Head>
    <Component {...pageProps} />
  </>;
};

export default MyApp;
