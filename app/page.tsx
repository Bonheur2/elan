import { ArrowRight, Clock3, MapPin, Soup, Users, UtensilsCrossed, Wine } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#experience', label: 'Experience' },
  { href: '#hours', label: 'Hours' },
]

const stats = [
  { value: '2019', label: 'Est. in Kigali' },
  { value: '07', label: 'Course tasting menu' },
  { value: 'Tue–Sun', label: '6:00PM – 10:30PM' },
]

const dishes = [
  {
    name: 'Suya-Spiced Tuna Tataki',
    detail: 'Toasted sesame, scotch bonnet oil, pickled daikon',
    price: 'RWF 14,500',
  },
  {
    name: 'Jollof Risotto',
    detail: 'Smoked tomato, grilled prawns, crispy shallots',
    price: 'RWF 16,000',
  },
  {
    name: 'Miso-Glazed Goat Rib',
    detail: 'Cassava purée, charred scallion, chili caramel',
    price: 'RWF 18,500',
  },
]

const experience = [
  { icon: UtensilsCrossed, title: 'Seasonal tasting menu', copy: 'Seven courses built around what’s fresh this week, reworked by the kitchen every month.' },
  { icon: Wine, title: 'Curated cellar', copy: 'Old-world labels and African-grown wines, chosen to stand up to the spice on your plate.' },
  { icon: Users, title: 'Private dining', copy: 'A closed-door room for up to 14 guests, for the dinners that need a little more quiet.' },
  { icon: Clock3, title: 'Late kitchen', copy: 'Full menu until close, Tuesday through Sunday — no rushed last orders.' },
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
          <p className="eyebrow">Afro-Asian fine dining · Kigali</p>
          <h1>Flavors that travel,<br /><em>a table that stays.</em></h1>
          <p className="hero-lede">Kozo blends West African warmth with Asian precision — a menu built for long nights, good company, and the kind of evening worth lingering over.</p>
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
        <div className="hero-visual" aria-hidden="true">
          <span className="hero-visual-mark">K</span>
        </div>
      </section>

      <section className="landing-section" id="about">
        <div className="section-split">
          <div>
            <p className="eyebrow">Our story</p>
            <h2>Two kitchens,<br />one table.</h2>
          </div>
          <div className="section-copy">
            <p>Kozo started as a question: what happens when a Kigali kitchen stops choosing between its neighbors and its influences? The answer is a menu that moves freely between suya spice and soy glaze, cassava and rice noodle, without apologizing for either.</p>
            <p>Every plate is built to be shared, every table is set to be lingered over, and every evening ends the way a good one should — slowly.</p>
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
              <Soup size={20} strokeWidth={1.5} />
              <h3>{dish.name}</h3>
              <p>{dish.detail}</p>
              <span className="dish-price">{dish.price}</span>
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
        <p>“We don’t plate two cuisines side by side. We cook until they stop being two.”</p>
        <span>— The Kozo kitchen</span>
      </section>

      <section className="landing-section" id="hours">
        <div className="section-split">
          <div>
            <p className="eyebrow">Visit us</p>
            <h2>Find your table.</h2>
          </div>
          <div className="hours-grid">
            <div className="hours-card">
              <MapPin size={18} strokeWidth={1.5} />
              <div>
                <strong>Location</strong>
                <p>KG 7 Ave<br />Kigali, Rwanda</p>
              </div>
            </div>
            <div className="hours-card">
              <Clock3 size={18} strokeWidth={1.5} />
              <div>
                <strong>Hours</strong>
                <p>Tuesday — Sunday<br />6:00 PM — 10:30 PM</p>
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
        <span>© 2025 Kozo Kigali</span>
        <span>Reservations are subject to availability</span>
      </footer>
    </main>
  )
}
