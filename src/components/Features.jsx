import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitPullRequest, FileCode, Sparkles, Target, Bot, Layers, Zap } from 'lucide-react';

import slackLogo from '../assets/logos/slack-logo.webp';
import linearLogo from '../assets/logos/linear-logo.webp';
import githubLogo from '../assets/logos/github-logo.svg';
import salesforceLogo from '../assets/logos/Salesforce.com_logo.svg.png';

const avatars = {
  richard: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Richard&backgroundColor=b6e3f4',
  mark: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark&backgroundColor=c0aede',
  sarah: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=d1d4f9',
  nixo: 'https://api.dicebear.com/7.x/bottts/svg?seed=Nixo&backgroundColor=c4287e',
};

const features = [
  {
    id: 'context',
    icon: <Sparkles className="w-5 h-5" />,
    label: 'Context Capture',
    title: 'Capture customer context automatically',
    description: 'Nixo turns customer calls into an organized view of their tech stack, environment, and feature requests. No more scrambling for notes.',
    color: 'nixo',
    Visual: FeatureContext,
  },
  {
    id: 'attention',
    icon: <Target className="w-5 h-5" />,
    label: 'Smart Prioritization',
    title: 'Direct your attention to what matters',
    description: 'Know which tickets to focus on based on account importance, issue complexity, and your past expertise.',
    color: 'amber',
    Visual: FeatureAttention,
  },
  {
    id: 'intake',
    icon: <Bot className="w-5 h-5" />,
    label: 'AI Intake Agent',
    title: 'AI-powered customer intake',
    description: "Nixo's AI Intake Agent engages customers to collect the context FDEs need before stepping in. Save hours of back-and-forth.",
    color: 'electric',
    Visual: FeatureIntake,
  },
  {
    id: 'duplicate',
    icon: <Layers className="w-5 h-5" />,
    label: 'Work Intelligence',
    title: 'Prevent duplicate work',
    description: 'See connected tickets, pull requests, and past solutions in one view. Never solve the same problem twice.',
    color: 'emerald',
    Visual: FeatureDuplicate,
  },
  {
    id: 'start80',
    icon: <Zap className="w-5 h-5" />,
    label: 'Code Intelligence',
    title: 'Start 80% done',
    description: 'Get a running start with relevant code, configs, and fixes pulled from past work across your entire team.',
    color: 'nixo',
    Visual: FeatureStart80,
  },
];

function FeatureRow({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  const colorClasses = {
    nixo: { bg: 'bg-nixo/15', text: 'text-nixo-light', glow: 'bg-nixo/20' },
    amber: { bg: 'bg-amber/15', text: 'text-amber', glow: 'bg-amber/20' },
    electric: { bg: 'bg-electric/15', text: 'text-electric', glow: 'bg-electric/20' },
    emerald: { bg: 'bg-emerald/15', text: 'text-emerald', glow: 'bg-emerald/20' },
  };

  const colors = colorClasses[feature.color];
  const Visual = feature.Visual;

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 border-b border-border last:border-b-0">
      {/* Text Column */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${isEven ? 'lg:order-1' : 'lg:order-2'} ${!isEven ? 'lg:border-l border-border' : 'lg:border-r border-border'}`}
      >
        {/* Icon badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colors.bg} ${colors.text}`}
        >
          {feature.icon}
        </motion.div>

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className={`text-sm font-medium mb-3 ${colors.text}`}
        >
          {feature.label}
        </motion.span>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-bold text-text mb-4 tracking-tight leading-[1.15]"
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-text-secondary leading-relaxed max-w-lg"
        >
          {feature.description}
        </motion.p>
      </motion.div>

      {/* Visual Column */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={`relative flex items-center justify-center p-8 md:p-12 lg:p-16 min-h-[400px] lg:min-h-[500px] ${isEven ? 'lg:order-2' : 'lg:order-1'} bg-surface/30`}
      >
        {/* Background glow */}
        <div className={`absolute inset-0 ${colors.glow} opacity-30 blur-3xl`} />

        {/* Visual component */}
        <div className="relative z-10 w-full max-w-xl">
          <Visual isInView={isInView} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-void" />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <span className="badge badge-nixo mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-nixo animate-pulse" />
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text mb-6 tracking-tight">
            One platform to
            <br />
            <span className="gradient-text-nixo">run your FDE ops</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Nixo brings together customer context, code intelligence, and workload visibility
            into one platform built specifically for forward deployed engineers.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border border-border rounded-3xl overflow-hidden bg-void/60 backdrop-blur-sm"
        >
          {features.map((feature, i) => (
            <FeatureRow key={feature.id} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Feature Visual Components ── */

function FeatureContext({ isInView }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="card-glass p-1.5 rounded-2xl border border-border">
        <div className="bg-void/95 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-4">
              <img src={salesforceLogo} alt="Salesforce" className="h-10 w-auto object-contain" />
              <div className="flex-1">
                <div className="font-semibold text-text text-base">Salesforce</div>
                <div className="text-sm text-text-muted">Enterprise Account</div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5, type: 'spring' }}
                className="px-3 py-1.5 rounded-full bg-emerald/20 text-emerald text-xs font-medium"
              >
                Active
              </motion.div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 divide-x divide-border border-b border-border">
            {[
              { value: '$185k', label: 'Annual Contract' },
              { value: '98th', label: 'Percentile' },
              { value: '+12%', label: 'QoQ Growth' },
              { value: 'Jan 2025', label: 'Since' },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 text-center"
              >
                <div className="text-base font-semibold text-text">{m.value}</div>
                <div className="text-[10px] text-text-muted mt-0.5">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="p-5">
            <div className="text-xs text-nixo-light mb-3 font-medium flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-nixo"
              />
              Technical Environment
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '☁️', label: 'Cloud', value: 'AWS + GovCloud' },
                { icon: '🗄️', label: 'Database', value: 'Oracle RAC' },
                { icon: '🔒', label: 'Security', value: 'SOC 2 Type II' },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-surface rounded-xl p-3 border border-border hover:border-nixo/30 transition-all cursor-default"
                >
                  <div className="text-xs text-text-muted mb-1">{tech.icon} {tech.label}</div>
                  <div className="text-sm text-text font-medium">{tech.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureAttention({ isInView }) {
  const tickets = [
    { priority: 'high', company: 'Pied Piper', person: 'Richard Hendricks', msg: 'ETL pipeline not syncing customer data', complexity: 'high', account: 'medium' },
    { priority: 'medium', company: 'Hooli', person: 'Gavin Belson', msg: 'API rate limiting issues', complexity: 'medium', account: 'high' },
    { priority: 'low', company: 'Raviga', person: 'Laurie Bream', msg: 'Dashboard needs refresh', complexity: 'low', account: 'low' },
  ];

  return (
    <div className="space-y-4">
      {tickets.map((ticket, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 80 }}
          whileHover={{ scale: 1.02, x: 8 }}
          className={`card-glass p-5 rounded-xl border transition-all cursor-default ${
            i === 0 ? 'border-red-500/40 bg-red-500/5 shadow-lg shadow-red-500/10' : 'border-border'
          }`}
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={i === 0 ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                ticket.priority === 'high' ? 'bg-red-500' :
                ticket.priority === 'medium' ? 'bg-amber' : 'bg-text-muted'
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-semibold text-text">{ticket.company}</span>
                <img src={slackLogo} alt="Slack" className="w-5 h-5 object-contain opacity-60" />
              </div>
              <div className="text-sm text-text-muted mb-2">{ticket.person}</div>
              <p className="text-sm text-text-secondary mb-3">{ticket.msg}</p>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                  ticket.account === 'high' ? 'bg-emerald/20 text-emerald' :
                  ticket.account === 'medium' ? 'bg-amber/20 text-amber' :
                  'bg-surface text-text-muted'
                }`}>
                  Account: {ticket.account}
                </span>
                <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                  ticket.complexity === 'high' ? 'bg-red-500/20 text-red-400' :
                  ticket.complexity === 'medium' ? 'bg-amber/20 text-amber' :
                  'bg-surface text-text-muted'
                }`}>
                  Complexity: {ticket.complexity}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FeatureIntake({ isInView }) {
  const messages = [
    { type: 'user', name: 'Richard Hendricks', msg: "We don't think the ETL pipeline is working for us", time: '12:15 AM' },
    { type: 'bot', name: 'Nixo AI', msg: 'Thanks for flagging this! Can you tell me which data sources you\'re trying to sync?', time: '12:15 AM' },
    { type: 'user', name: 'Richard Hendricks', msg: 'We want to pull from Datadog and push to our analytics dashboard', time: '12:17 AM' },
    { type: 'bot', name: 'Nixo AI', msg: "Got it! I've gathered the context. Assigning to Sarah who has expertise in Datadog integrations.", time: '12:17 AM' },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="card-glass p-1.5 rounded-2xl border border-border">
        <div className="bg-void/95 rounded-xl overflow-hidden">
          {/* Chat header */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-emerald"
            />
            <span className="text-sm font-medium text-text">Nixo Intake Agent</span>
            <span className="text-xs text-text-muted ml-auto bg-surface px-2 py-0.5 rounded-full">Online</span>
          </div>

          {/* Messages */}
          <div className="p-5 space-y-5">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, x: m.type === 'user' ? 15 : -15 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.2, type: 'spring', stiffness: 80 }}
                className={`flex gap-3 ${m.type === 'bot' ? '' : 'flex-row-reverse'}`}
              >
                <img
                  src={m.type === 'bot' ? avatars.nixo : avatars.richard}
                  alt=""
                  className="w-8 h-8 rounded-full bg-surface flex-shrink-0"
                />
                <div className={`flex-1 ${m.type === 'bot' ? '' : 'text-right'}`}>
                  <div className={`flex items-center gap-2 mb-1.5 ${m.type === 'bot' ? '' : 'justify-end'}`}>
                    <span className={`text-sm font-medium ${m.type === 'bot' ? 'text-electric' : 'text-text'}`}>
                      {m.name}
                    </span>
                    <span className="text-[10px] text-text-faded">{m.time}</span>
                  </div>
                  <div className={`inline-block rounded-2xl px-4 py-2.5 text-sm text-text-secondary ${
                    m.type === 'bot'
                      ? 'bg-electric/10 border border-electric/20 rounded-tl-sm'
                      : 'bg-surface border border-border rounded-tr-sm'
                  }`}>
                    {m.msg}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureDuplicate({ isInView }) {
  return (
    <div className="space-y-4">
      {/* Linear ticket */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3 }}
        className="card-glass p-5 rounded-xl border border-border"
      >
        <div className="flex items-start gap-4">
          <img src={linearLogo} alt="Linear" className="w-6 h-6 object-contain dark-invert flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-text-muted">NIX-45</span>
              <span className="text-base font-medium text-text">Add Datadog integration</span>
            </div>
            <p className="text-sm text-text-muted mb-2">Initial Datadog support with API key authentication</p>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald/20 text-emerald font-medium">Done</span>
          </div>
        </div>
      </motion.div>

      {/* Connection line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex justify-center"
      >
        <div className="w-[2px] h-8 bg-gradient-to-b from-emerald/60 to-electric/60 rounded-full" />
      </motion.div>

      {/* GitHub PR */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.6 }}
        className="card-glass p-5 rounded-xl border border-electric/40 bg-electric/5"
      >
        <div className="flex items-start gap-4">
          <img src={githubLogo} alt="GitHub" className="w-6 h-6 object-contain dark-invert flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <GitPullRequest className="w-4 h-4 text-emerald" />
              <span className="text-base font-medium text-text">PR #234: Multi-Region Monitoring</span>
            </div>
            <p className="text-sm text-text-muted">EU1 Datadog account with region-specific API URLs</p>
          </div>
        </div>
      </motion.div>

      {/* Connection line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex justify-center"
      >
        <div className="w-[2px] h-8 bg-gradient-to-b from-electric/60 to-nixo/60 rounded-full" />
      </motion.div>

      {/* Current request */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9 }}
        className="card-glass p-5 rounded-xl border border-nixo/40 bg-nixo/5"
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-nixo"
          />
          <span className="text-sm font-medium text-nixo-light">Current Request</span>
        </div>
        <p className="text-base text-text mb-3">Fidelity wants Datadog metrics in their custom dashboard</p>
        <div className="p-3 bg-surface rounded-lg border border-border">
          <span className="text-sm text-text-muted">💡 Suggested: Reference PR #234 for API patterns</span>
        </div>
      </motion.div>
    </div>
  );
}

function FeatureStart80({ isInView }) {
  const items = [
    { id: '#4751', prefix: 'CUSTESC', title: 'Added a custom ETL pipeline for Fidelity', match: 80, color: 'emerald' },
    { id: '#4743', prefix: 'TEAMENG', title: 'Upgrade Datadog integration to pull from EU1', match: 63, color: 'amber' },
    { id: '#4750', prefix: 'DEFECT', title: 'Improved performance of the data cleaning agent', match: 41, color: 'nixo' },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="card-glass p-1.5 rounded-2xl border border-border">
        <div className="bg-void/95 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-border flex items-center gap-3">
            <Zap className="w-5 h-5 text-nixo-light" />
            <span className="text-base font-medium text-text">Relevant Past Work</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-nixo/20 text-nixo-light font-medium ml-auto">
              3 matches found
            </span>
          </div>

          {/* Items */}
          <div className="divide-y divide-border">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 25 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="p-5 flex items-center gap-5 cursor-default transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0"
                >
                  <FileCode className="w-6 h-6 text-amber" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-nixo-light">{item.id}</span>
                    <span className="text-xs font-mono text-text-muted">{item.prefix}</span>
                  </div>
                  <span className="text-base text-text block truncate">{item.title}</span>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                  className={`text-sm px-4 py-2 rounded-full font-medium flex-shrink-0 ${
                    item.color === 'emerald' ? 'bg-emerald/20 text-emerald' :
                    item.color === 'amber' ? 'bg-amber/20 text-amber' :
                    'bg-nixo/20 text-nixo-light'
                  }`}
                >
                  {item.match}% match
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
