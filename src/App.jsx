import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Showcase from './components/Showcase.jsx'
import Features from './components/Features.jsx'
import Download from './components/Download.jsx'
import Pricing from './components/Pricing.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-dvh overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <Download />
        {/* Section licence — masquée tant que la logique de monétisation n'est
            pas arrêtée. Les composants existent et se branchent en un flag. */}
        <Pricing enabled={false} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
