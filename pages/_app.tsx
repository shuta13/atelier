import "../assets/style/styles.css";
import "../assets/style/Global/Header.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "../components/common/Header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>did0es - Learn WebGL</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
