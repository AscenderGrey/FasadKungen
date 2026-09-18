import Image from "next/image";
import { LeadForm } from "@/components/lead-form";
import { galleryImages, images } from "@/lib/images";

const services = [
  ["01", "Fasadtvätt", "Rengöring av fasader."], ["02", "Blästring", "Blästring för ytor som behöver förberedas."], ["03", "Sanering", "Saneringsarbeten på plats."], ["04", "Intäckning", "Intäckning inför och under arbetet."], ["05", "Bilning", "Bilning för arbeten i betong och murverk."], ["06", "Rivning / grovarbete", "Rivning och grovarbete för små och stora jobb."], ["07", "Mindre renovering", "Mindre renoveringar och praktiska åtgärder."],
];

export default function Home() {
  const schema = { "@context": "https://schema.org", "@type": "GeneralContractor", name: "FasadKungen Sverige AB", telephone: "+46704033773", email: "fasadkungen@hotmail.com", address: { "@type": "PostalAddress", addressLocality: "Åsby Arlanda", addressCountry: "SE" }, areaServed: ["Stockholm", "Uppsala", "Sverige"], foundingDate: "1999" };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <a className="skip-link" href="#content">Hoppa till innehållet</a>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="FasadKungen, till startsidan">FASAD<span>KUNGEN</span><small>SVERIGE AB</small></a><nav aria-label="Huvudmeny"><a href="#tjanster">Tjänster</a><a href="#om-oss">Om oss</a><a href="#kontakt">Kontakt</a></nav><a className="header-phone" href="tel:+46704033773">070-403 37 73</a></header>
    <div id="top" />
    <section className="hero" id="content"><div className="hero-copy"><p className="eyebrow">SEDAN 1999 · ÅSBY ARLANDA</p><h1>Vi tar tag i <em>det tunga.</em></h1><p className="hero-intro">Fasad- och grovarbeten för projekt i Stockholm, Uppsala och resten av Sverige.</p><div className="hero-actions"><a className="button button-orange" href="#kontakt">Få offert</a><a className="text-link" href="tel:+46704033773">Ring 070-403 37 73 <span>↗</span></a></div></div><figure className="hero-image"><Image src={images.billy.src} alt={images.billy.alt} fill priority sizes="(max-width: 800px) 100vw, 54vw" /><figcaption>FasadKungen Sverige AB</figcaption></figure></section>
    <section className="statement"><p>Vi kör och ni blir nöjda. <strong>Rock n roll.</strong></p><span aria-hidden="true">///</span></section>
    <section className="intro section"><p className="eyebrow">ERFARENHET SOM SYNS I ARBETET</p><div><h2>Rakt handlag. Rätt insats.</h2><p>FasadKungen Sverige AB har arbetat med fasad- och grovarbeten sedan 1999. Vi kommer till jobbet, gör det som behövs och håller en rak dialog hela vägen.</p></div></section>
    <section className="why section"><p className="eyebrow">DÄRFÖR FASADKUNGEN</p><div><h2>Vi gör jobbet själva.</h2><p>Med över 25 års erfarenhet och ett erfaret team tar vi oss an både mindre åtgärder och större grovarbeten. Vi jobbar praktiskt, är tydliga från början och stannar tills arbetet är klart.</p></div></section>
    <section id="tjanster" className="services section"><div className="section-head"><p className="eyebrow">VAD VI GÖR</p><h2>Tjänster</h2></div><div className="service-list">{services.map(([number, title, text]) => <article key={number} className="service"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="gallery section" aria-labelledby="gallery-title"><div className="section-head"><p className="eyebrow">MILJÖER</p><h2 id="gallery-title">Arbete kräver rätt förutsättningar.</h2><p className="gallery-note">Bilderna nedan är miljöbilder. Vi fyller på med dokumenterade projektbilder efter hand.</p></div><div className="gallery-grid">{galleryImages.map((image) => <figure key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 100vw, 50vw" /><figcaption>{image.label}</figcaption></figure>)}</div></section>
    <section id="om-oss" className="about"><div className="about-image"><Image src={images.portrait.src} alt={images.portrait.alt} fill sizes="(max-width: 800px) 100vw, 40vw" /></div><div className="about-copy"><p className="eyebrow">FASADKUNGEN</p><h2>På plats sedan 1999.</h2><p>Vi utgår från Åsby Arlanda och arbetar främst i Stockholm och Uppsala. När jobbet kräver det kör vi över hela Sverige.</p><p>Behöver du fasadtvätt, blästring, sanering, intäckning, bilning, rivning eller ett par extra händer för grovarbete? Hör av dig och berätta vad som ska göras.</p><a className="text-link" href="#kontakt">Berätta om ditt jobb <span>↓</span></a></div></section>
    <section id="kontakt" className="contact section"><div className="contact-intro"><p className="eyebrow">KONTAKT</p><h2>Berätta vad du behöver hjälp med</h2><p>Beskriv jobbet kort så återkommer vi. Du kan också ringa eller mejla direkt.</p><address><a href="tel:+46704033773">070-403 37 73</a><a href="mailto:fasadkungen@hotmail.com">fasadkungen@hotmail.com</a><span>Åsby Arlanda</span></address></div><LeadForm /></section>
    <footer><div className="wordmark">FASAD<span>KUNGEN</span><small>SVERIGE AB</small></div><p>Fasad- och grovarbeten i Stockholm, Uppsala och hela Sverige.</p><p>© {new Date().getFullYear()} FasadKungen Sverige AB</p></footer>
    <div className="mobile-actions"><a href="tel:+46704033773">Ring</a><a href="#kontakt">Få offert</a></div>
  </main>;
}
