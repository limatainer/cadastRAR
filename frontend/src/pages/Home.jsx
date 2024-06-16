import Cta from '../components/Cta';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Cta />
    </div>
  );
}
