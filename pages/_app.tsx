import "../assets/style/styles.css";
import "../components/common/Header.scss";
import "../components/common/MyGLSL.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../components/common/Header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pathname = router.pathname;
  console.log(pathname);
  return (
    <>
      <Head>
        <meta property="og:image" content={`https://learn-webgl.now.sh${pathname}.png`} />
        <title>did0es - Learn WebGL</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
