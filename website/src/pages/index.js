import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Easy to Use</>,
    imageUrl: 'img/app_data.svg',
    description: <>Easily share data between applications.</>,
  },
  {
    title: <>Share files</>,
    imageUrl: 'img/attached_file.svg',
    description: (
      <>Share files using base64 or the file url on the device(according to each platform)</>
    ),
  },
  {
    title: <>Powered by react-native-community</>,
    imageUrl: 'img/react.svg',
    description: <>Help us out with issues, PR's and many more: https://bit.ly/3cI7xNb.</>,
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <>
      <Head>
        <meta property="og:description" content="react-native-share" />
        <meta charSet="utf-8" />
        <title>react-native-share</title>
        <link rel="canonical" href="https://react-native-community.github.io/react-native-share/" />
      </Head>
      <Layout title={`Docs of ${siteConfig.projectName} 📤`} description={siteConfig.tagline}>
        <header className={classnames('hero hero--primary', styles.heroBanner)}>
          <div className="container">
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className={classnames(
                  'button button--outline button--secondary button--lg',
                  styles.getStarted,
                )}
                to={useBaseUrl('docs/install')}
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>
        <main>
          {features && features.length > 0 && (
            <section className={styles.features}>
              <div className="container">
                <div className="row">
                  {features.map((props, idx) => (
                    <Feature key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </Layout>
    </>
  );
}

export default Home;
