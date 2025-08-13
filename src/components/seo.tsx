import logo from "@/assets/starknotes-logo-large.png";

export default function SEO({
  title,
  description,
  name = "Emmanuel Odwale",
  type = "web app",
  image = "https://i.postimg.cc/433jZwzN/Screenshot-2025-08-10-181742.png",
  url = "https://starknote.vercel.app/",
}: {
  title: string;
  description: string;
  name?: string;
  type?: string;
  image?: string;
  url?: string;
}) {
  return (
    <>
      {/* Standard metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook) metadata */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter metadata */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Author metadata */}
      <meta name="author" content={name} />

      <link rel="icon" href={logo} sizes="32x32" type="image/png" />
    </>
  );
}
