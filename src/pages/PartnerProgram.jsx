import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Handshake, Share2, Mail, Trophy, CheckCircle2, GraduationCap, Briefcase } from 'lucide-react';

const rewards = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: 'YC / Accelerator Application Help',
    description: 'Get hands-on mentorship and review for your YC or accelerator application from people who\'ve been through it.',
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: 'FDE Job Referrals',
    description: 'Earn direct referrals to forward deployed engineering roles at top AI companies in our network.',
  },
];

const steps = [
  {
    number: '01',
    icon: <Share2 className="w-5 h-5" />,
    title: 'Share with your network',
    description: 'Share the FDE hiring Google Form link through clubs, group chats, classrooms, social media, and word of mouth.',
  },
  {
    number: '02',
    icon: <Mail className="w-5 h-5" />,
    title: 'Email us your resume',
    description: 'Send your resume to team@withnixo.com with the subject line "Fall 25 Campus Partner Program".',
  },
  {
    number: '03',
    icon: <Trophy className="w-5 h-5" />,
    title: 'Top partners get rewarded',
    description: 'We\'ll reach out to the top 7 Partners with mentorship and referral opportunities.',
  },
];

export default function PartnerProgram() {
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
              <Handshake className="w-3.5 h-3.5" />
              Partner Program
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-text">Earn mentorship for</span>
              <br />
              <span className="gradient-text-nixo">YC Application or direct job referrals</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
              The Nixo Partner Program empowers top students to become growth leaders for Nixo while earning real career rewards.
            </p>
            <motion.a
              href="mailto:team@withnixo.com?subject=Fall%2025%20Campus%20Partner%20Program"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-base px-8 py-4 inline-flex"
            >
              <Sparkles className="w-4 h-4" />
              Become a Partner
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* What is the program */}
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
                What is the Nixo Partner Program?
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Nixo Partners introduce their peers to Nixo's Forward Deployed Engineering Hiring Program through authentic outreach — clubs, group chats, classrooms, social media, and word of mouth. In return, top partners earn career-changing rewards.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rewards */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-text text-center mb-12"
          >
            What you earn
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map((reward, i) => (
              <motion.div
                key={reward.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card card-hover card-glow p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-nixo/15 text-nixo flex items-center justify-center mb-4">
                  {reward.icon}
                </div>
                <h3 className="text-base font-semibold text-text mb-2">{reward.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{reward.description}</p>
              </motion.div>
            ))}
          </div>
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

      {/* What counts */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 md:p-10"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold text-text mb-4">
              What counts as a successful referral?
            </h2>
            <p className="text-text-secondary mb-6">
              A referral is counted when an authentic user:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0" />
                <span className="text-text">Submits the job application</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0" />
                <span className="text-text">Enters your name in the "Referred By" section</span>
              </div>
            </div>
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
              <Handshake className="w-8 h-8 text-nixo mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text mb-3">
                Ready to become a Nixo Partner?
              </h2>
              <p className="text-text-secondary mb-6">
                Email your resume with subject "Fall 25 Campus Partner Program"
              </p>
              <a
                href="mailto:team@withnixo.com?subject=Fall%2025%20Campus%20Partner%20Program"
                className="btn-primary inline-flex"
              >
                <Mail className="w-4 h-4" />
                Email Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
