import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="did0es - Learn WebGL" />
          <meta property="og:site_name" content="did0es - Learn WebGL" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://learn-webgl.did0es.me" />
          <meta property="og:title" content="did0es - Learn WebGL" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:description" content="did0es - Learn WebGL" />
          <meta property="og:image" content="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Almendra+Display&family=Song+Myung&family=Sarpanch&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
