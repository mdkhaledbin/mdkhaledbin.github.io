export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "MD Khaled Bin",
    url: "https://mdkhaledbin.me",
    image: "https://mdkhaledbin.me/avatar.jpg",
    jobTitle: "Full-Stack Engineer",
    description:
      "Full-Stack Engineer specializing in AI systems and scalable applications",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sylhet",
      addressCountry: "Bangladesh",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Shahjalal University of Science and Technology",
    },
    sameAs: [
      "https://github.com/mdkhaledbin",
      "https://www.linkedin.com/in/md-khaled-bin-814a4b225/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
