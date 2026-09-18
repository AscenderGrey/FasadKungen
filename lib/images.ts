export const images = {
  billy: { src: "/images/fasadkungen-billy-van.webp", alt: "Billy från FasadKungen vid företagets arbetsbil" },
  portrait: { src: "/images/fasadkungen-billy-portrait.webp", alt: "Porträtt av Billy från FasadKungen" },
  waterfront: { src: "/images/fasadkungen-waterfront.webp", alt: "Betongmiljö vid vatten", label: "Miljöbild" },
  concrete: { src: "/images/fasadkungen-concrete.webp", alt: "Betongyta med graffiti", label: "Miljöbild" }
} as const;

// Replace these entries with documented customer-approved project images and captions.
// Until then, use only clearly labelled environment images and make no project claims.
export const galleryImages = [images.waterfront, images.concrete];
