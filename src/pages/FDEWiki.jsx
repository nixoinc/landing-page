import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronRight, ArrowRight, Sparkles, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const wikiData = [
  {
    category: 'Defining the Role',
    items: [
      {
        question: 'What is an FDE?',
        answer: `A forward-deployed engineer, or FDE, is a rapidly evolving software engineering role that top AI companies are leveraging. It was a role born to combat the main, central inefficiencies that emerged during the transition into the AI era, where the ability for products to unlock value immediately out of the wrapper was largely lost due to the technology's infancy.

FDE roles across the industry will vary. Some companies employ FDEs because their product doesn't work without it. Other roles are closer to consultants, helping customers milk out the last 15-20% of customer value through custom deployments. In very simple terms, FDEs ensure that customers receive the value that they are paying for. They're salesmen, engineers and consultants all in one, with roles oscillating across that spectrum but spending the most time in the middle.

Palantir pioneered the role in the mid-2010s, and today still employs the most FDEs by far.

"Forward deployment" is a military term that refers to soldiers permanently deployed overseas. Following this analogy, a traditional software engineer is akin to a soldier based domestically; they rarely leave their home office, whereas FDEs integrate with customers, spending significant time on-site and juggling multiple deployments simultaneously.`,
      },
      {
        question: 'How are FDEs different from traditional software engineers?',
        answer: `Traditional software engineers typically work on internal products with well-defined specs, operating within a single codebase and team. FDEs, on the other hand, operate at the intersection of engineering and customer success.

The key differences include: FDEs work directly with customers, often on-site or in close collaboration. They must context-switch rapidly between different customer environments, tech stacks, and business requirements. While a traditional engineer might spend weeks on a single feature, an FDE might deploy custom solutions across multiple accounts in the same timeframe.

FDEs also need stronger communication skills — they translate between business requirements and technical implementation, often serving as the primary technical point of contact for enterprise customers. They need to understand not just code, but the customer's business context, constraints, and goals.`,
      },
      {
        question: 'What value do FDE roles unlock?',
        answer: `FDE roles unlock several critical types of value for companies, particularly in the AI era:

First, they dramatically accelerate time-to-value for enterprise customers. Instead of customers struggling through self-serve documentation, an FDE ensures the product is deployed, integrated, and delivering ROI within weeks rather than months.

Second, FDEs serve as an incredibly powerful feedback loop between customers and the product team. They see firsthand where the product falls short, what integrations customers need, and what features would unlock the most value. This intelligence is invaluable for product roadmap decisions.

Third, FDEs enable companies to win and retain enterprise deals that would otherwise be impossible. Many enterprise customers require custom integrations, specific compliance configurations, or bespoke deployments. Without FDEs, these deals simply wouldn't close.

Finally, FDE work often becomes the basis for productizing features. Custom solutions built for one customer frequently get generalized and rolled into the core product, benefiting all customers.`,
      },
    ],
  },
  {
    category: 'Hiring and Background',
    items: [
      {
        question: 'What backgrounds do FDEs have?',
        answer: `The best FDEs tend to come from a few distinct backgrounds:

Former founders and founding engineers are top candidates. They've worn multiple hats — product, engineering, sales, support — and can context-switch naturally. They understand the full stack of building and shipping.

New graduates with strong technical foundations and genuine enthusiasm also excel. Their energy and eagerness to learn translates directly to customer confidence. Customers feel genuinely cared for when their FDE shows up excited and committed.

Engineers with consulting backgrounds bring the client management skills that are essential. They already understand how to manage expectations, scope work, and deliver under pressure.

Technical range matters more than domain expertise. An FDE doesn't need to know the customer's industry on day one. What they need is the ability to drop into an unfamiliar system, make sense of it quickly, and plan around hidden constraints. The best FDEs are rapid learners who can go deep on any technical domain in a short timeframe.`,
      },
      {
        question: 'What kind of companies are hiring FDEs?',
        answer: `FDE hiring is concentrated in several categories of companies:

AI-native startups are the fastest-growing segment. Companies building LLM-powered products, AI agents, and machine learning infrastructure frequently need FDEs because their products require significant customization for each enterprise deployment.

Developer tools and infrastructure companies — those building APIs, SDKs, and platforms — hire FDEs to help enterprise customers integrate and get the most value from their tools.

Vertical SaaS companies serving complex industries like healthcare, fintech, and govtech often need FDEs for compliance-heavy deployments and domain-specific integrations.

Data and analytics platforms hire FDEs to help customers set up data pipelines, custom dashboards, and integrations with their existing tech stack.

Palantir remains the largest employer of FDEs, but the role has now spread across hundreds of high-growth startups, particularly those backed by Y Combinator and other top accelerators.`,
      },
      {
        question: 'What is the best way to get an FDE job?',
        answer: `The most effective paths into FDE roles:

Build and ship projects that demonstrate both technical skill and customer empathy. Open source contributions, freelance integrations, and personal projects that solve real problems for real users signal FDE readiness.

Network within the FDE community. Attend meetups, engage on LinkedIn with FDE leaders, and reach out directly to founders at companies hiring FDEs. The community is still small enough that personal connections matter enormously.

Develop a T-shaped skill set: deep expertise in one area (e.g., backend engineering, data pipelines, or ML ops) combined with broad familiarity across frontend, infrastructure, and DevOps.

Practice articulating technical concepts to non-technical audiences. FDEs spend as much time explaining solutions as building them. Your ability to communicate clearly with customers is as important as your coding ability.

Consider starting at a company where you can get customer-facing engineering experience — even if the title isn't "FDE." Solutions engineering, technical consulting, and customer success engineering roles all build relevant muscles.`,
      },
      {
        question: 'How are FDEs compensated?',
        answer: `FDE compensation varies significantly based on company stage, location, and seniority, but generally falls in line with or above senior software engineering compensation.

At early-stage startups (seed to Series A), FDEs typically earn $120K-$180K base salary plus meaningful equity (0.1%-0.5%). The equity component can be substantial given the growth trajectory of companies investing in FDE teams.

At growth-stage companies (Series B+), base salaries range from $160K-$250K with equity refreshers. Some companies also offer performance bonuses tied to customer success metrics like deployment speed, NPS, or account expansion.

At Palantir and similarly large companies, total compensation for experienced FDEs can exceed $300K-$400K including stock.

The compensation premium for FDEs reflects the unique combination of skills required: deep technical ability plus customer-facing communication, plus the willingness to travel and operate in high-pressure, ambiguous environments.`,
      },
    ],
  },
  {
    category: 'Building an FDE Team',
    items: [
      {
        question: 'How should you price your forward deployed services?',
        answer: `FDE pricing is one of the trickiest decisions for founders. Most teams are guessing — they charge nothing, charge too little, burn their margins, or accidentally subsidize their product with infinite FDE hours.

Two models tend to work best:

The Concierge Model (charge upfront): Bundle FDE cost directly into the entry point ACV if your customers cannot succeed without integrations or white-glove configuration. Think devtools, embedded voice agents, healthcare AI, or usage-based products. Price on the number of integrations the customer needs, not engineering hours. This prevents every custom request from turning into a procurement discussion.

The Bespoke Cost Model (charge as you go): Ideal when customer success doesn't depend on custom integrations, but custom work can meaningfully expand the deal. Start customers on a clear pilot or typical product fee, then charge explicitly for each new deployment or implementation cycle. This works especially well if the core product is already 60-70% self-serve.

The key principle: if the customer needs FDE work to succeed, include it in the ACV. If FDE work is a growth lever on top of a working product, charge incrementally.`,
      },
    ],
  },
];

export default function FDEWiki() {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState(new Set(['What is an FDE?']));
  const [activeCategory, setActiveCategory] = useState('Defining the Role');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleItem = (question) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(question)) {
        next.delete(question);
      } else {
        next.add(question);
      }
      return next;
    });
  };

  const filteredData = searchQuery
    ? wikiData
        .map((section) => ({
          ...section,
          items: section.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.items.length > 0)
    : wikiData;

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
              <BookOpen className="w-3.5 h-3.5" />
              Knowledge Base
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-text">The Forward Deployed</span>
              <br />
              <span className="gradient-text-nixo">Engineering Wiki</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
              Everything you need to know about forward deployed engineering — from defining the role
              to building and pricing your FDE team.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faded" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the wiki..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-surface border border-border text-text placeholder-text-faded text-sm transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar Nav */}
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="lg:sticky lg:top-28">
                <div className="text-[10px] font-semibold text-text-faded uppercase tracking-widest mb-3 px-3">
                  Contents
                </div>
                <div className="space-y-1">
                  {wikiData.map((section) => (
                    <button
                      key={section.category}
                      onClick={() => {
                        setActiveCategory(section.category);
                        setSearchQuery('');
                        document.getElementById(section.category.replace(/\s+/g, '-').toLowerCase())?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === section.category
                          ? 'bg-nixo/10 text-nixo'
                          : 'text-text-secondary hover:text-text hover:bg-surface-hover'
                      }`}
                    >
                      {section.category}
                    </button>
                  ))}
                </div>

                {/* CTA card */}
                <div className="mt-8 p-4 rounded-2xl bg-surface border border-border">
                  <p className="text-sm font-semibold text-text mb-1">
                    Scaling your FDE team?
                  </p>
                  <p className="text-xs text-text-muted mb-4">
                    Manage it with Nixo.
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); navigate('/#contact'); }}
                    className="inline-flex items-center gap-2 text-xs font-medium text-nixo hover:text-nixo-light transition-colors"
                  >
                    Learn More <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.nav>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {filteredData.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-text-muted text-lg">No results found for "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-sm text-nixo hover:text-nixo-light transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              )}

              {filteredData.map((section, sectionIdx) => (
                <motion.div
                  key={section.category}
                  id={section.category.replace(/\s+/g, '-').toLowerCase()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * sectionIdx }}
                  className="mb-12 scroll-mt-28"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 rounded-full bg-nixo" />
                    <h2 className="text-xl md:text-2xl font-display font-bold text-text">
                      {section.category}
                    </h2>
                  </div>

                  {/* FAQ Items */}
                  <div className="space-y-3">
                    {section.items.map((item) => {
                      const isOpen = openItems.has(item.question);
                      return (
                        <div
                          key={item.question}
                          className="card overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => toggleItem(item.question)}
                            className="w-full flex items-start gap-3 p-5 text-left group"
                          >
                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                              isOpen ? 'bg-nixo/15 text-nixo' : 'bg-surface-elevated text-text-muted group-hover:text-text'
                            }`}>
                              {isOpen ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                              )}
                            </div>
                            <h3 className={`text-sm md:text-base font-semibold transition-colors ${
                              isOpen ? 'text-text' : 'text-text-secondary group-hover:text-text'
                            }`}>
                              {item.question}
                            </h3>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5 pl-13">
                                  <div className="border-l-2 border-border pl-5 ml-0.5">
                                    {item.answer.split('\n\n').map((para, i) => (
                                      <p key={i} className="text-sm text-text-secondary leading-relaxed mb-3 last:mb-0">
                                        {para}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="card-glass p-10 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-nixo/5" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text mb-3">
                Ready to superpower your forward-deployed service?
              </h2>
              <p className="text-text-secondary mb-6">
                Configure your FDE pricing and team structure on Nixo today.
              </p>
              <a
                href="https://cal.com/priya-nixo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                <Sparkles className="w-4 h-4" />
                Get Started with Nixo
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
