import "../assets/style/styles.css";
import "../components/common/Header.scss";
import "../components/common/MyGLSL.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../components/common/Header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const ogImageName = router.pathname === "/" ? "/og-image" : router.pathname;
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content={`https://learn-webgl.now.sh${ogImageName}.png`}
        />
        <title>did0es - Learn WebGL</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
