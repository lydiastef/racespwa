// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Place links such as your manifest here */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          {/* iOS Specific Meta Tags */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="App Title" />
          <link rel="apple-touch-icon" sizes="192x192" href="/icons/apple-touch-icon.png" />

          {/* Theme Color for Chrome, Firefox OS and Opera */}
          <meta name="theme-color" content="#1282A2"/>

          {/* Other head elements such as stylesheets, fonts, etc. */}
          <link rel="icon" href="/favicon.ico" />
          {/* You can also include fonts, stylesheets, etc. */}
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
