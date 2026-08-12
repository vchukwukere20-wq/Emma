import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Emma - E-commerce Platform</title>
        <meta name="description" content="Emma is a modern e-commerce platform connecting buyers and sellers" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
