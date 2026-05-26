import Hero from '../components/sections/Hero'
import Journey from '../components/sections/Journey'
import Services from '../components/sections/Services'
import Science from '../components/sections/Science'
import NineMonthJourney from '../components/sections/NineMonthJourney'
import WhyUs from '../components/sections/WhyUs'
import Gallery from '../components/sections/Gallery'
import Testimonials from '../components/sections/Testimonials'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Journey />
      <Services />
      <NineMonthJourney />
      <Science />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <Contact />
    </main>
  )
}
