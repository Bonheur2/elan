import Image from 'next/image'
import { ArrowRight, Clock3, MapPin, Phone, Users, UtensilsCrossed, Wine } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const stats = [
  { value: '2018', label: 'Est. in Kigali' },
  { value: 'Farm-to-table', label: 'Sourced from local farms' },
  { value: 'Tue–Sun', label: 'Lunch, dinner & brunch' },
]

const dishes = [
  {
    name: 'Chef’s Sashimi Platter',
    detail: 'Market salmon and shrimp, yuzu, wasabi',
    image: '/images/food-1.webp',
  },
  {
    name: 'Seared Catch, Garden Herbs',
    detail: 'Pan-seared fillet, charred vegetables, edible flowers',
    image: '/images/food-2.webp',
  },
  {
    name: 'Signature Maki Roll',
    detail: 'Crab, avocado, tobiko, yuzu aioli',
    image: '/images/food-3.webp',
  },
]

const experience = [
  { icon: UtensilsCrossed, title: 'Farm-to-table menu', copy: 'Ingredients sourced from local farms, plated with Pan-Asian technique and African flavour.' },
  { icon: Wine, title: 'Food, wine & cocktails', copy: 'A curated drinks list built to match the spice and depth of every plate.' },
  { icon: Users, title: 'Private events & venue hire', copy: 'From intimate gatherings to large-scale celebrations, Kōzo sets the stage.' },
  { icon: Clock3, title: 'Lunch, dinner & brunch', copy: 'Open Tuesday through Sunday, with the kitchen running till midnight on Fridays and Saturdays.' },
]

export default function LandingPage() {
  return (
    <main className="landing-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kozo home">
          <span className="brand-mark">K</span>
          <span>KOZO</span>
        </a>
        <nav className="landing-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>{link.label}</a>
          ))}
        </nav>
        <a className="header-cta" href="/reserve">Book a table</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">The Afro-Asian experience · Kigali</p>
          <h1>Flavors that travel,<br /><em>a table that stays.</em></h1>
          <p className="hero-lede">Vibrant African flavours meet the refined precision of Pan-Asian cuisine — inspired by the ancient trade routes that once connected two continents.</p>
          <div className="hero-actions">
            <a className="primary-button hero-primary" href="/reserve">Book a table <ArrowRight size={16} /></a>
            <a className="text-link" href="#menu">Explore the menu</a>
          </div>
          <dl className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-visual">
          <Image src="/images/hero.webp" alt="Kozo's poolside terrace at night" fill sizes="(max-width: 900px) 100vw, 45vw" priority />
        </div>
      </section>

      <section className="landing-section" id="about">
        <div className="section-split">
          <div className="section-image">
            <Image src="/images/about.webp" alt="Suya-spiced skewers with jollof rice at Kozo" fill sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
          <div>
            <p className="eyebrow">Our story</p>
            <h2>Two kitchens,<br />one table.</h2>
            <div className="section-copy">
              <p>Kōzo was founded in 2018 by Ramzi Yamusah, built around a simple idea: that Africa and Asia have been trading spices, techniques, and stories since the Silk Road first connected them. Every dish on our table continues that conversation.</p>
              <p>We work directly with community farmers here in Rwanda, sourcing what’s fresh for a menu that moves with the seasons — because a shared plate is only as good as what went into it.</p>
            </div>
            <p className="founder-credit">— Ramzi Yamusah, Founder</p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section-muted" id="menu">
        <p className="eyebrow">Signature plates</p>
        <h2>A taste of the menu</h2>
        <p className="step-intro landing-section-intro">A short preview of what’s currently on the table. The full tasting menu changes with the season.</p>
        <div className="dish-grid">
          {dishes.map((dish) => (
            <article className="dish-card" key={dish.name}>
              <div className="dish-image">
                <Image src={dish.image} alt={dish.name} fill sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 33vw" />
              </div>
              <div className="dish-card-body">
                <h3>{dish.name}</h3>
                <p>{dish.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="experience">
        <p className="eyebrow">Why Kozo</p>
        <h2>The details we don’t skip</h2>
        <div className="feature-grid">
          {experience.map(({ icon: Icon, title, copy }) => (
            <div className="feature-card" key={title}>
              <Icon size={22} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-quote">
        <p>“Where cultures converge, and flavours inspire.”</p>
        <span>— Ramzi Yamusah, Founder of Kōzo</span>
      </section>

      <section className="landing-section" id="contact">
        <div className="section-split">
          <div>
            <p className="eyebrow">Contact us</p>
            <h2>Find your table.</h2>
          </div>
          <div className="hours-grid">
            <div className="hours-card">
              <MapPin size={18} strokeWidth={1.5} />
              <div>
                <strong>Location</strong>
                <p>17 KN 14 Ave<br />Kigali, Rwanda</p>
                <a className="hours-card-link" href="https://www.google.com/maps/search/?api=1&query=17+KN+14+Ave,+Kigali,+Rwanda" target="_blank" rel="noreferrer">Get directions</a>
              </div>
            </div>
            <div className="hours-card">
              <Clock3 size={18} strokeWidth={1.5} />
              <div>
                <strong>Hours</strong>
                <p>Lunch Tue–Sat, 12PM – 3PM<br />Dinner Tue–Thu, 6PM – 11PM<br />Dinner Fri–Sat, 6PM – 12AM<br />Brunch Sun, 2PM – 10PM</p>
              </div>
            </div>
            <div className="hours-card">
              <Phone size={18} strokeWidth={1.5} />
              <div>
                <strong>Reach us</strong>
                <p><a className="hours-card-link" href="tel:+250798979779">0798 979 779</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <h2>Your table is waiting.</h2>
        <a className="primary-button cta-band-button" href="/reserve">Book a table <ArrowRight size={16} /></a>
      </section>

      <footer className="site-footer">
        <span>© 2026 Kozo Kigali</span>
        <span>Reservations are subject to availability</span>
      </footer>
    </main>
  )
}
