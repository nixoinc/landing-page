import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, Check, Star, Mail, CalendarCheck } from 'lucide-react';

const tiers = [
  {
    name: 'Lightweight',
    description: 'Curated list of up to 5 relevant candidates from the Nixo network',
    originalPrice: '$2,500',
    price: '$1,000',
    successFee: '+ 10% success fee per hire',
    popular: false,
  },
  {
    name: 'Pipeline',
    description: 'Detailed profiles or warm intros for 20-25 handpicked candidates',
    originalPrice: '$5,500',
    price: '$2,000',
    successFee: '+ 10% success fee per hire',
    popular: true,
  },
  {
    name: 'Custom',
    description: 'High-touch sourcing for 30+ candidates, shown to you first',
    originalPrice: '$8,500',
    price: '$5,000',
    successFee: '+ 15% success fee per hire',
    popular: false,
  },
];

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

      {/* Pricing */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              Tell us what you're looking for.
              <br />
              <span className="text-text-secondary">We'll surface the right people.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative card p-6 flex flex-col ${
                  tier.popular ? 'border-nixo/40 shadow-lg shadow-nixo/10' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-nixo text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3 className="text-lg font-display font-bold text-text mb-3">{tier.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed min-h-[48px]">
                    {tier.description}
                  </p>
                </div>

                <div className="text-center mb-4 mt-auto">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-text-faded line-through text-sm">{tier.originalPrice}</span>
                    <span className="text-3xl font-display font-bold text-nixo">{tier.price}</span>
                  </div>
                  <p className="text-xs text-text-muted">{tier.successFee}</p>
                </div>

                <a
                  href="https://cal.com/priya-nixo/hiring-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                    tier.popular
                      ? 'bg-nixo hover:bg-nixo-light text-white'
                      : 'bg-surface-elevated hover:bg-surface-hover text-text border border-border'
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
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
