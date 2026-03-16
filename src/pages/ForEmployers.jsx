import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Mail, CalendarCheck } from 'lucide-react';

export default function ForEmployers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-nixo mb-6">
              <Building2 className="w-3.5 h-3.5" />
              Hiring Hub
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-text">Hire exceptional</span>
              <br />
              <span className="gradient-text-nixo">forward deployed engineers</span>
            </h1>
            <div className="text-left max-w-2xl mx-auto mb-10 space-y-4">
              <p className="text-lg text-text-secondary">
                Hi! We're Nixo – we make internal tools for forward deployed teams at AI companies.
              </p>
              <p className="text-lg text-text-secondary">
                Along the way, we've accumulated an ever-growing network of skilled, hungry FDEs
                and FDE aspirants. We launched the Nixo Hiring Hub to give teams direct access to
                this elite talent. If you want high-signal introductions for your FDE team, we can help.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              Tell us what you're looking for.
              <br />
              <span className="text-text-secondary">We'll surface the right people.</span>
            </h2>
            <p className="text-text-secondary mb-8">
              Book a call and we'll tailor a plan to your hiring needs.
            </p>
            <a
              href="https://cal.com/priya-nixo/hiring-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <CalendarCheck className="w-4 h-4" />
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="card-glass p-10 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-nixo/5" />
            <div className="relative">
              <Building2 className="w-8 h-8 text-nixo mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text mb-3">
                Ready to build your FDE team?
              </h2>
              <p className="text-text-secondary mb-6">
                Book an intro call or email us directly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://cal.com/priya-nixo/hiring-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book an Intro Call
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="mailto:team@withnixo.com"
                  className="btn-secondary inline-flex"
                >
                  <Mail className="w-4 h-4" />
                  team@withnixo.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
