import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Briefcase, GraduationCap, Code2, MessageSquare, DollarSign, Calendar, Target, Linkedin, Rocket, CheckCircle2, Loader2 } from 'lucide-react';

const formFields = [
  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe', icon: <Users className="w-4 h-4" />, required: true },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'jane@company.com', icon: <MessageSquare className="w-4 h-4" />, required: true },
  { id: 'linkedin', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/janedoe', icon: <Linkedin className="w-4 h-4" />, required: true },
  { id: 'company', label: 'Company + Tenure', type: 'text', placeholder: 'Acme Corp — 2 years', icon: <Briefcase className="w-4 h-4" />, required: true },
  { id: 'education', label: 'Education', type: 'text', placeholder: 'BS Computer Science, MIT', icon: <GraduationCap className="w-4 h-4" />, required: true },
  { id: 'stack', label: 'Tech Stack', type: 'text', placeholder: 'Python, TypeScript, React, AWS, PostgreSQL', icon: <Code2 className="w-4 h-4" />, required: true },
  { id: 'comp', label: 'Compensation Expectations', type: 'text', placeholder: '$150k–$200k base + equity', icon: <DollarSign className="w-4 h-4" />, required: true },
  { id: 'availability', label: 'Availability', type: 'text', placeholder: 'Available immediately / 2 weeks notice', icon: <Calendar className="w-4 h-4" />, required: true },
  { id: 'targetStage', label: 'Target Company Stage', type: 'text', placeholder: 'Series A–B, or growth stage', icon: <Target className="w-4 h-4" />, required: true },
];

export default function SaaStr() {
  const [form, setForm] = useState({});
  const [customerFacing, setCustomerFacing] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/saastr-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, customerFacing }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero */}
      <section className="relative px-6 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-nixo mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              SaaStr 2025
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-text">Get matched with</span>
              <br />
              <span className="gradient-text-nixo">top FDE employers at SaaStr</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-4">
              We're hand-matching top FDE candidates with leading employers attending SaaStr. Fill out the form below to get matched before the conference.
            </p>
            <p className="text-sm font-semibold text-nixo mb-10">
              Apply by Monday, May 11th to get matched.
            </p>
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-base px-8 py-4 inline-flex"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Sparkles className="w-4 h-4" />
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* What is this */}
      <section className="px-6 pb-16">
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
                What is SaaStr Matching?
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Nixo is heading to SaaStr and we're bringing the best FDE candidates with us — matched directly to top employers hiring at the conference.
                </p>
                <p>
                  Submit your application below and we'll hand-match you with companies looking for talent like yours. Selected candidates will receive a personalized intro card shared directly with hiring teams on the ground at SaaStr.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-16">
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
            {[
              {
                number: '01',
                icon: <Rocket className="w-5 h-5" />,
                title: 'Apply below',
                description: 'Fill out the form with your background, stack, and what you\'re looking for.',
              },
              {
                number: '02',
                icon: <Users className="w-5 h-5" />,
                title: 'We match you',
                description: 'Our team reviews your profile and hand-matches you with employers attending SaaStr.',
              },
              {
                number: '03',
                icon: <Briefcase className="w-5 h-5" />,
                title: 'Meet at SaaStr',
                description: 'Matched employers get your intro card and connect with you at the conference.',
              },
            ].map((step, i) => (
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

      {/* Application Form */}
      <section id="apply" className="px-6 pb-20 scroll-mt-28">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text text-center mb-3">
              Apply to get matched
            </h2>
            <p className="text-text-secondary text-center mb-10">
              All fields are required. We review every application by hand.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass p-10 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-nixo/5" />
              <div className="relative">
                <CheckCircle2 className="w-12 h-12 text-emerald mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold text-text mb-3">
                  Application received
                </h3>
                <p className="text-text-secondary">
                  We'll review your profile and reach out if there's a match. See you at SaaStr!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-6 md:p-8 space-y-5"
            >
              {formFields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                    <span className="text-nixo">{field.icon}</span>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={form[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
                  />
                </div>
              ))}

              {/* Customer-facing experience — yes/no + context */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text mb-3">
                  <span className="text-nixo"><MessageSquare className="w-4 h-4" /></span>
                  Customer-facing experience?
                </label>
                <div className="flex gap-3 mb-3">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCustomerFacing(option)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                        customerFacing === option
                          ? 'bg-nixo/15 border-nixo text-nixo'
                          : 'bg-surface border-border text-text-secondary hover:border-text-muted'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {customerFacing === 'Yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea
                      placeholder="Tell us about your customer-facing experience..."
                      required
                      value={form.customerContext || ''}
                      onChange={(e) => handleChange('customerContext', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-surface border border-border text-text placeholder-text-faded transition-all duration-200 focus:outline-none focus:border-nixo focus:shadow-[0_0_0_3px_var(--color-nixo-glow)] resize-none"
                    />
                  </motion.div>
                )}
              </div>

              {/* Most interesting thing shipped */}
              <div>
                <label htmlFor="shipped" className="flex items-center gap-2 text-sm font-medium text-text mb-2">
                  <span className="text-nixo"><Rocket className="w-4 h-4" /></span>
                  Most interesting thing you've shipped to a real customer
                </label>
                <textarea
                  id="shipped"
                  placeholder="Describe something you built that was used by actual customers..."
                  required
                  value={form.shipped || ''}
                  onChange={(e) => handleChange('shipped', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-surface border border-border text-text placeholder-text-faded transition-all duration-200 focus:outline-none focus:border-nixo focus:shadow-[0_0_0_3px_var(--color-nixo-glow)] resize-none"
                />
              </div>

              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className="btn-primary w-full py-4 text-base justify-center disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Submit Application
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
                <p className="text-xs text-text-muted text-center mt-3">
                  Deadline: Monday, May 11th
                </p>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
