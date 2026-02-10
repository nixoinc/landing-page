import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Search, CalendarCheck, CheckCircle2, Briefcase, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <Briefcase className="w-5 h-5" />,
    title: 'Submit your application',
    description: 'Fill out the form with your background, skills, and what kind of FDE role you\'re looking for.',
  },
  {
    number: '02',
    icon: <Search className="w-5 h-5" />,
    title: 'We screen & share with employers',
    description: 'Our team reviews your profile and shares it with vetted FDE teams actively hiring.',
  },
  {
    number: '03',
    icon: <CalendarCheck className="w-5 h-5" />,
    title: 'Employers schedule interviews',
    description: 'Matched employers reach out directly to schedule interviews with screened candidates.',
  },
];

export default function ForCandidates() {
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
              <Users className="w-3.5 h-3.5" />
              Hiring Hub
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-text">Get matched to top</span>
              <br />
              <span className="gradient-text-nixo">AI teams hiring FDEs</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
              The best FDE teams trust Nixo to find exceptional talent. If you're interested in forward deployed engineering, we're excited to help you get there.
            </p>
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfikR5gnl-GYDl3jsWO7gy17RMB9I05fv6_IYuRWbDhpTDeEA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-base px-8 py-4 inline-flex"
            >
              <Sparkles className="w-4 h-4" />
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* What is Nixo Hiring Hub */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-8 md:p-10 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-nixo/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-display font-bold text-text mb-4">
                What is Nixo Hiring Hub?
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Nixo builds internal tools for Forward-Deployed Engineering (FDE) teams at AI startups and late-stage companies. There's one question that our customers keep asking us:{' '}
                  <span className="text-text font-medium italic">"Do you know anyone great we should hire?"</span>
                </p>
                <p>
                  After making a number of successful introductions, we've launched the Nixo Hiring Hub to connect exceptional FDEs and FDE aspirants with the best FDE teams. If a team is hiring FDEs, we usually hear about it first. And if you're interested in being an FDE, we're excited to help you get there.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-text text-center mb-12"
          >
            How it works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card card-hover p-6 relative"
              >
                <div className="absolute top-4 right-4 text-4xl font-display font-bold text-border">
                  {step.number}
                </div>
                <div className="w-10 h-10 rounded-xl bg-nixo/15 text-nixo flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-base font-semibold text-text mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
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
              <Rocket className="w-8 h-8 text-nixo mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text mb-3">
                Ready to land your FDE role?
              </h2>
              <p className="text-text-secondary mb-6">
                Join the best forward deployed engineers working at top AI companies.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfikR5gnl-GYDl3jsWO7gy17RMB9I05fv6_IYuRWbDhpTDeEA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                <Sparkles className="w-4 h-4" />
                Submit Application
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
