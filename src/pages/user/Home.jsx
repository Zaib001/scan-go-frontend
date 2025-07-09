
import Faqs from '../Faqs';
import Features from '../Features';
import FinalCTA from '../FinalCTA';
import Footer from '../Footer';
import Header from '../Header';
import Hero from '../Hero';
import HowItWorks from '../HowItWorks';
import PricingCTA from '../PricingCTA';
import Testimonials from '../Testimonials';

const Home = () => {


  return (
    <div>
      <Header />
      <Hero />

      <Features />
      <HowItWorks />
      <PricingCTA />
      <Faqs />

      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Home;
