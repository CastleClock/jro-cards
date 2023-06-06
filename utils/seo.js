import { ArticleJsonLd } from "next-seo";
import { config } from "../lib/pageConfig";

const getImage = (data = {}) => {
  if (data.imageUrl) {
    return [{ url: data.imageUrl, width: 600, height: 300, alt: data.title }];
  }

  if (data.slug) {
    return [
      {
        url: `/api/blog-image/${data.slug}`,
        width: 600,
        height: 300,
        alt: data.title,
      },
    ];
  }

  return [
    {
      url: config.websiteLogo,
      width: 280,
      height: 280,
      alt: "JRO",
    },
  ];
};

export function BlogSeo({ data }) {
  if (!data) return null;

  const description = data.seoDescription
    ? data.seoDescription
    : config.siteDescription;

  return (
    <ArticleJsonLd
      url={data.canonicalUrl}
      title={data.title}
      images={getImage(data).map((file) => file.url)}
      datePublished={data.publishDate}
      dateModified={data.modifiedDate}
      authorName={config.author}
      publisherName={config.author}
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description={description}
    />
  );
}

export function createSEOConfig(data = {}) {
  const title = data.title || config.defaultPageTitle;
  const description = data.seoDescription
    ? data.seoDescription
    : config.siteDescription;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: data.canonicalUrl,
      title,
      description,
      images: getImage(data),
      site_name: config.siteName,
    },
    twitter: {
      handle: config.twitterHandle,
      site: config.twitterHandle,
      cardType: config.twitterCardType,
    },
  };
}

export function createSEOPageConfig(config = {}) {
  if (!config) return null;

  const title = config.defaultPageTitle;
  const description = config.siteDescription;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: config.canonicalUrl,
      title,
      description,
      images: getImage(config),
      site_name: config.siteName,
    },
    twitter: {
      handle: config.twitterHandle,
      site: config.twitterHandle,
      cardType: config.twitterCardType,
    },
  };
}
