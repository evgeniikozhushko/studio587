export default function StructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Studio 587",
      "description": "Web development, branding, and digital marketing services",
      "url": "https://studio587.ca",
      "areaServed": [
        { "@type": "City", "name": "Canmore", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alberta" }},
        { "@type": "City", "name": "Banff" },
        { "@type": "Place", "name": "Bow Valley" }
      ],
      "serviceType": ["Web Development", "Branding", "Digital Marketing"],
      "priceRange": "$$"
    };
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }