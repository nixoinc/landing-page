import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Integrations from '../components/Integrations';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      {/* Manifesto banner */}
      <section className="relative z-10 bg-void py-24 px-6 border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-3 mb-10">
            {[
              { text: 'Support teams organize work by tracking customer requests.' },
              { text: 'Engineering teams organize work by tracking product issues.' },
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-30px' }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-xl md:text-2xl font-display font-medium text-text leading-snug"
              >
                {line.text}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-30px' }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl md:text-2xl font-display font-bold text-text leading-snug"
            >
              But FDEs? They live at the <span className="text-nixo">intersection of both</span>.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: '-30px' }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="inline-block bg-nixo/10 border border-nixo/20 rounded-2xl px-8 py-5"
          >
            <p className="text-lg md:text-xl font-display font-bold text-text leading-relaxed">
              With Nixo, customer and product work stay in sync
              <br className="hidden md:block" />
              <span className="gradient-text-nixo"> from conversation to resolution.</span>
            </p>
          </motion.div>
        </div>
      </section>
      <Features />
      <div className="divider" />
      <Integrations />
      <div className="divider-glow" />
      <Contact />
    </>
  );
}
