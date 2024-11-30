import { Metadata } from 'next';

export interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  pathname?: string;
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex,
  pathname,
}: GenerateMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://starter.rasmic.xyz';
  const defaultDescription = 'The Ultimate Nextjs 14 Starter Kit for quickly building your SaaS';
  const defaultImage = 'https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png';

  const metadata: Metadata = {
    title: title ? `${title} | Nextjs Starter Kit` : 'Nextjs Starter Kit',
    description: description || defaultDescription,
    openGraph: {
      title: title || 'Nextjs Starter Kit',
      description: description || defaultDescription,
      images: [image || defaultImage],
      url: pathname ? `${baseUrl}${pathname}` : baseUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Nextjs Starter Kit',
      description: description || defaultDescription,
      images: [image || defaultImage],
      creator: '@rasmic',
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
