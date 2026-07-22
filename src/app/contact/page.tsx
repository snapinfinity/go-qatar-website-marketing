import ContactClient from "./ContactClient";

const CONTACT_URL = "https://goqatar.app/contact";

export const metadata = {
  title: "Contact Us — Go Qatar",
  description: "Get in touch with the Go Qatar team. Send feedback, report a bug, or ask for help.",
  alternates: {
    canonical: CONTACT_URL,
  },
  openGraph: {
    title: "Contact Us — Go Qatar",
    description: "Get in touch with the Go Qatar team. Send feedback, report a bug, or ask for help.",
    url: CONTACT_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://goqatar.app/contact/#webpage",
      url: CONTACT_URL,
      name: "Contact Us — Go Qatar",
      description: "Get in touch with the Go Qatar team. Send feedback, report a bug, or ask for help.",
      isPartOf: { "@id": "https://goqatar.app/#website" },
      about: { "@id": "https://goqatar.app/#organization" },
      mainEntity: {
        "@type": "Organization",
        "@id": "https://goqatar.app/#organization",
        contactPoint: {
          "@type": "ContactPoint",
          email: "help.goqatar@gmail.com",
          contactType: "customer support",
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://goqatar.app" },
        { "@type": "ListItem", position: 2, name: "Contact Us", item: CONTACT_URL },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
