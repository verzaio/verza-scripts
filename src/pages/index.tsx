import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Verza Scripts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/img/favicon.png" />
      </Head>

      <div
        style={{
          display: 'flex',
          margin: '0 auto',
          padding: '30px',
        }}>
        <h4>Verza Scripts</h4>
      </div>
    </>
  );
}
