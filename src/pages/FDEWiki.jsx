import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Calendar, Users, FileText, Search, Lightbulb,
  Code2, ArrowRight, Sparkles, Share2, Link as LinkIcon,
  ExternalLink, MapPin,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Wiki Content Data ───────────────────────────────────────────────────────

const wikiSections = [
  {
    id: 'defining-the-role',
    title: 'Defining the Role',
    articles: [
      {
        id: 'forward-deployed-engineer',
        type: 'content',
        title: 'Forward Deployed Engineer (FDE)',
        paragraphs: [
          "A forward-deployed engineer, or FDE, is a rapidly evolving software engineering role that top AI companies are leveraging. It was a role born to combat the inert, central inefficiencies that emerged during the transition into the AI era, where the ability for products to unlock value immediately out of the wrapper was largely lost due to the technology's infancy.",
          "FDE roles across the industry will vary. Some companies employ FDEs because their product doesn't work without it. Other roles are closer to consultants, helping customers milk out the last 15-20% of customer value through custom deployments. In very simple terms, FDEs ensure that customers receive the value that they are paying for. They're salesmen, engineers and consultants all in one, with roles oscillating across that spectrum but spending the most time in the middle.",
          'Palantir pioneered the role in the mid-2010s, and today still employs the most FDEs by far.',
        ],
      },
      {
        id: 'military-origins',
        type: 'insight',
        title: 'Military Origins',
        paragraphs: [
          '"Forward deployment" is a military term that refers to soldiers permanently deployed overseas. Following this analogy, a traditional software engineer is akin to a soldier based domestically; they rarely leave their home office, whereas FDEs integrate with customers, spending significant time on-site and juggling multiple deployments simultaneously.',
        ],
      },
      {
        id: 'fde-vs-traditional',
        type: 'table',
        title: 'FDE vs Traditional Software Engineer',
        headers: ['', 'TRADITIONAL ENGINEER', 'FORWARD DEPLOYED ENGINEER'],
        rows: [
          ['Location', 'Central office', 'Customer sites (on-site)'],
          ['Focus', 'Core product development', 'Customer integrations & implementations'],
          ['Interaction', 'Internal teams', 'Direct customer engagement'],
          ['Skillset', 'Deep technical expertise', 'Technical + communication + consulting'],
          ['Travel', 'Minimal', 'Frequent and extensive'],
        ],
      },
      {
        id: 'value-proposition',
        type: 'content',
        title: 'Value Proposition',
        paragraphs: [
          'FDEs ensure that customers receive the full value they are paying for by customizing implementations, integrating with existing systems, and providing hands-on support. They bridge the gap between product capabilities and customer needs, particularly critical for AI and complex enterprise software where out-of-the-box solutions often fall short.',
        ],
      },
      {
        id: 'fde-spectrum',
        type: 'insight',
        title: 'Key Insight: The FDE Spectrum',
        paragraphs: [
          'FDE roles exist on a spectrum from product-dependent (where the product literally doesn\'t work without FDE support) to value-optimization (where FDEs help extract the final 15-20% of potential value through custom deployments). Understanding where a role falls on this spectrum is crucial for both companies hiring and engineers considering FDE positions.',
        ],
      },
    ],
  },
  {
    id: 'hiring-and-background',
    title: 'Hiring and Background',
    articles: [
      {
        id: 'typical-fde-background',
        type: 'content',
        title: 'Typical FDE Background Profile',
        paragraphs: [
          'FDEs typically come from software engineering backgrounds with strong communication skills and customer-facing experience. Many have backgrounds in consulting, technical sales engineering, or product engineering. The ideal candidate combines technical depth with the ability to translate complex concepts for non-technical stakeholders.',
        ],
      },
      {
        id: 'companies-hiring-fdes',
        type: 'content',
        title: 'Companies Hiring FDEs',
        paragraphs: [
          'AI and enterprise software companies are the primary hirers of FDEs. Notable examples include:',
        ],
        bullets: [
          'Palantir (the pioneer and largest employer)',
          'Scale AI',
          'Anthropic',
          'OpenAI',
          'Many B2B SaaS platforms requiring complex integrations',
          'Enterprise AI startups',
        ],
        trailingParagraphs: [
          'The role is particularly common in companies where product complexity or customization needs exceed typical SaaS deployment models.',
        ],
      },
      {
        id: 'breaking-into-fde',
        type: 'example',
        title: 'Breaking Into FDE',
        paragraphs: ['The most effective path into FDE roles involves:'],
        numberedList: [
          'Network with current FDEs through LinkedIn and industry events',
          'Demonstrate strong technical fundamentals (typically 2+ years of engineering)',
          'Highlight any customer-facing work or communication skills',
          'Show adaptability and willingness to travel',
          'Consider transitional roles like solutions engineering or technical account management',
        ],
      },
      {
        id: 'compensation-structure',
        type: 'content',
        title: 'Compensation Structure',
        paragraphs: [
          'FDEs are typically compensated similarly to software engineers at the same level, with competitive base salaries plus equity. Some companies offer additional compensation for travel and on-site work. Total compensation often matches or exceeds traditional SWE roles when including travel perks and bonuses for successful deployments.',
        ],
      },
      {
        id: 'critical-success-factor',
        type: 'insight',
        title: 'Critical Success Factor',
        paragraphs: [
          'The most successful FDEs possess a unique combination of technical excellence and emotional intelligence. They can debug complex systems in the morning and present to C-suite executives in the afternoon. This dual capability is rare and highly valued.',
        ],
      },
    ],
  },
  {
    id: 'building-an-fde-team',
    title: 'Building an FDE Team',
    articles: [
      {
        id: 'pricing-forward-deployed-services',
        type: 'content',
        title: 'Pricing Forward Deployed Services',
        paragraphs: [
          'Forward deployed services can be priced using several models:',
        ],
        bullets: [
          'Time and Materials: Hourly or daily rates reflecting specialized expertise',
          'Project-Based: Fixed fees for defined scopes and deliverables',
          'Success-Based: Pricing tied to customer outcomes or value realized',
          'Hybrid Models: Combination of base fees plus success incentives',
        ],
        trailingParagraphs: [
          'Pricing should reflect both the technical complexity and the business value delivered to customers.',
        ],
      },
      {
        id: 'team-structure-best-practice',
        type: 'insight',
        title: 'Team Structure Best Practice',
        paragraphs: [
          'Successful FDE teams often organize around customer segments or industries rather than technical specialties. This allows FDEs to develop deep domain expertise and build lasting customer relationships. A typical structure includes team leads for each vertical, with individual FDEs assigned to specific accounts or deployment regions.',
        ],
      },
      {
        id: 'deployment-model-example',
        type: 'example',
        title: 'Deployment Model Example',
        paragraphs: ['A common deployment model for FDE teams:'],
        customLines: [
          'Phase 1 (Weeks 1-2): Initial assessment and scoping with customer',
          'Phase 2 (Weeks 3-6): Core integration and customization work',
          'Phase 3 (Weeks 7-8): Training and knowledge transfer',
          'Phase 4 (Ongoing): Periodic check-ins and optimization',
        ],
        trailingParagraphs: [
          'This phased approach ensures customer success while allowing FDEs to manage multiple concurrent deployments.',
        ],
      },
    ],
  },
];

const allArticles = wikiSections.flatMap((s) =>
  s.articles.map((a) => ({ ...a, sectionId: s.id, sectionTitle: s.title }))
);

const browseCards = [
  { key: 'wiki', icon: BookOpen, title: 'FDE Wiki', description: 'Comprehensive guide to understanding forward deployed engineering' },
  { key: 'events', icon: Calendar, title: 'Events', description: 'Join upcoming conferences, workshops, and networking opportunities' },
  { key: 'friends', icon: Users, title: 'Friends of Nixo', description: 'Meet the top community voices driving innovation in the FDE space' },
  { key: 'media', icon: FileText, title: 'Media', description: 'Latest coverage and insights about forward deployed engineering' },
];

// ─── Events Data ─────────────────────────────────────────────────────────────

const nixoEvents = [
  {
    title: 'Nixo X Rippling FDE Conference II',
    badge: 'in-person',
    date: 'March 17th, 2026',
    location: 'The Wilsey Center',
    lumaUrl: 'https://luma.com/embed/event/evt-WBQzyALqrA3Gyj8/simple',
  },
];

const communityEvents = [
  {
    title: 'Snowflake x Modal FDE is taking over the world',
    badge: 'in-person',
    date: 'February 20th, 2026',
    location: 'Snowflake HQ',
    url: 'https://luma.com/yd4wv75q',
  },
];

// ─── Friends Data ────────────────────────────────────────────────────────────

const friendsData = [
  {
    name: 'Milos Mandic',
    company: 'Lleverage',
    bio: 'Milos Mandic is an FDE at Lleverage, an EU-based AI automation company. He runs FDE Club, a blog and podcast dedicated to FDE content.',
    linkedin: 'https://www.linkedin.com/in/mandicm/',
    website: '#',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQEclApcNNkQYw/profile-displayphoto-crop_800_800/B4DZk9QbeAJYAQ-/0/1757669341448?e=1774483200&v=beta&t=YfZKLPhBIsaCaYMu_Fex4Ffa5j3coN6WqpuS1EV8z_k',
    initials: 'MM',
  },
  {
    name: 'Priya Kandelwal',
    company: 'Nixo',
    bio: "Priya Kandelwal is the founder of Nixo and a Stanford CS and YC alumni. She's active on LinkedIn, making frequent posts about the trajectory of FDE.",
    linkedin: 'https://www.linkedin.com/in/priya-khandelwal-86b84018b/',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQEuJXBTkj-XeA/profile-displayphoto-crop_800_800/B56ZitD7.1G4AI-/0/1755250149713?e=1774483200&v=beta&t=Gx4DQV14mwI0UdVm81Q84itSq7ikVoQXYD4L359giPU',
    initials: 'PK',
  },
  {
    name: 'Kevin Bai',
    company: 'Rippling',
    bio: 'Kevin Bai is a founding FDE at Rippling. He makes frequent posts about FDE and is an avid speaker at FDE events.',
    linkedin: 'https://www.linkedin.com/in/zkevinbai/',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQHIATxZHaQHkw/profile-displayphoto-shrink_800_800/B56ZYWubqQHEAc-/0/1744137993242?e=1774483200&v=beta&t=uVxcsdv1JTlWe1AB2flZoGNOFwmVQyGiIw15xymvCsA',
    initials: 'KB',
  },
];

// ─── Media Data ──────────────────────────────────────────────────────────────

const mediaData = [
  {
    title: 'Fondo podcast with Priya Khandelwal',
    source: 'Fondo',
    date: '2/14/26',
    url: 'https://www.linkedin.com/posts/fondohq_in-saas-products-worked-out-of-the-box-activity-7437296507352944640-vNh2/?utm_source=share&utm_medium=member_ios&rcm=ACoAACzL2NMBS6yeXm0UspqwP37NB_B24LXZ__M',
  },
  {
    title: 'New grads make great FDEs \u2013 Priya Khandelwal by Milos Mandic',
    source: 'FDE hub',
    date: '2/19/26',
    url: 'https://www.fdehub.org/p/new-grads-make-great-fdes-a-conversation',
  },
  {
    title: 'Nixo x YC FDE conference recording',
    source: 'Nixo',
    date: '11/29/25',
    url: '#',
  },
];

const relatedArticles = [
  { title: 'Typical FDE Background Profile', category: 'Hiring and Background', id: 'typical-fde-background' },
  { title: 'Companies Hiring FDEs', category: 'Hiring and Background', id: 'companies-hiring-fdes' },
  { title: 'Breaking Into FDE', category: 'Hiring and Background', id: 'breaking-into-fde' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ContentCard({ article }) {
  return (
    <div id={article.id} className="scroll-mt-32 card p-6 md:p-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-nixo/15 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-nixo" />
        </div>
        <h3 className="text-lg md:text-xl font-display font-bold text-text pt-0.5">
          {article.title}
        </h3>
      </div>
      <div className="space-y-4">
        {article.paragraphs.map((p, i) => (
          <p key={i} className="text-sm md:text-base text-text-secondary leading-relaxed">
            {p}
          </p>
        ))}
        {article.bullets && (
          <ul className="space-y-1.5 ml-1">
            {article.bullets.map((b, i) => (
              <li key={i} className="text-sm md:text-base text-text-secondary leading-relaxed flex items-start gap-2">
                <span className="text-text-faded mt-1.5 flex-shrink-0">&#x2022;</span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {article.trailingParagraphs?.map((p, i) => (
          <p key={`t-${i}`} className="text-sm md:text-base text-text-secondary leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function InsightCard({ article }) {
  return (
    <div id={article.id} className="scroll-mt-32 border-l-3 border-nixo pl-6 py-1">
      <div className="flex items-center gap-2.5 mb-3">
        <Lightbulb className="w-4.5 h-4.5 text-nixo flex-shrink-0" />
        <h3 className="text-lg md:text-xl font-display font-bold text-text">
          {article.title}
        </h3>
      </div>
      <div className="space-y-4">
        {article.paragraphs.map((p, i) => (
          <p key={i} className="text-sm md:text-base text-text-secondary leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function ExampleCard({ article }) {
  return (
    <div id={article.id} className="scroll-mt-32 card p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="w-4 h-4 text-nixo" />
        <span className="text-xs font-semibold text-text-faded uppercase tracking-wider">
          EXAMPLE
        </span>
      </div>
      <h3 className="text-lg md:text-xl font-display font-bold text-text mb-4">
        {article.title}
      </h3>
      <div className="space-y-4">
        {article.paragraphs.map((p, i) => (
          <p key={i} className="text-sm md:text-base text-text-secondary leading-relaxed">
            {p}
          </p>
        ))}
        {article.numberedList && (
          <ol className="space-y-1.5 ml-1">
            {article.numberedList.map((item, i) => (
              <li key={i} className="text-sm md:text-base text-text-secondary leading-relaxed flex items-start gap-2">
                <span className="text-text-faded flex-shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        )}
        {article.customLines && (
          <div className="space-y-1">
            {article.customLines.map((line, i) => (
              <p key={i} className="text-sm md:text-base text-text-secondary leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        )}
        {article.trailingParagraphs?.map((p, i) => (
          <p key={`t-${i}`} className="text-sm md:text-base text-text-secondary leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function TableCard({ article }) {
  return (
    <div id={article.id} className="scroll-mt-32 card p-6 md:p-8 overflow-x-auto">
      <h3 className="text-lg md:text-xl font-display font-bold text-text mb-6">
        {article.title}
      </h3>
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr>
            {article.headers.map((h, i) => (
              <th
                key={i}
                className={`text-left pb-4 font-semibold uppercase tracking-wider text-xs ${
                  i === 0 ? 'w-28 md:w-36' : 'text-nixo'
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {article.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-4 pr-4 ${
                    ci === 0
                      ? 'font-semibold text-text'
                      : 'text-text-secondary'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tab Content: Events ─────────────────────────────────────────────────────

function EventCard({ event }) {
  const Wrapper = event.url ? 'a' : 'div';
  const linkProps = event.url ? { href: event.url, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper {...linkProps} className={`card p-6 block ${event.url ? 'hover:border-border-strong transition-colors group' : ''}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <h4 className={`text-base font-semibold text-text ${event.url ? 'group-hover:text-nixo transition-colors' : ''}`}>{event.title}</h4>
        <span className="flex-shrink-0 text-xs font-medium text-nixo border border-nixo/40 rounded-full px-2.5 py-0.5">
          {event.badge}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Calendar className="w-3.5 h-3.5 text-text-faded flex-shrink-0" />
          {event.date}
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <MapPin className="w-3.5 h-3.5 text-text-faded flex-shrink-0" />
          {event.location}
        </div>
      </div>
    </Wrapper>
  );
}

function LumaEmbed({ url }) {
  return (
    <div className="card mt-4 overflow-hidden rounded-2xl" style={{ height: 350 }}>
      <iframe
        src={url}
        className="border-0 origin-top-left"
        style={{ width: '142.8%', height: '142.8%', transform: 'scale(0.7)' }}
        allow="fullscreen; payment"
        aria-hidden="false"
        tabIndex="0"
      />
    </div>
  );
}

function EventsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-2">Events</h2>
      <p className="text-base text-text-secondary mb-10">
        Join us at upcoming events, workshops, and community gatherings
      </p>
      <div className="border-t border-border mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Nixo Events */}
        <div>
          <h3 className="text-lg font-display font-bold text-text mb-1">Nixo Events</h3>
          <p className="text-sm text-text-muted mb-5">Hosted and co-hosted by Nixo</p>
          <div className="space-y-4">
            {nixoEvents.map((event, i) => (
              <div key={i}>
                <EventCard event={event} />
                {event.lumaUrl && <LumaEmbed url={event.lumaUrl} />}
              </div>
            ))}
          </div>
        </div>

        {/* Community Events */}
        <div>
          <h3 className="text-lg font-display font-bold text-text mb-1">Community Events</h3>
          <p className="text-sm text-text-muted mb-5">Events from the broader FDE community</p>
          <div className="space-y-4">
            {communityEvents.map((event, i) => (
              <div key={i}>
                <EventCard event={event} />
                {event.lumaUrl && <LumaEmbed url={event.lumaUrl} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tab Content: Friends of Nixo ────────────────────────────────────────────

function FriendsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-2">Friends of Nixo</h2>
      <p className="text-base text-text-secondary mb-10">
        Meet the top community voices driving innovation and education in the FDE space
      </p>
      <div className="border-t border-border mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {friendsData.map((person) => (
          <div key={person.name} className="card p-6">
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar */}
              {person.avatar ? (
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0 border border-border"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-surface-elevated border border-border flex items-center justify-center flex-shrink-0 text-lg font-bold text-text-muted">
                  {person.initials}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-text truncate">{person.name}</h4>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-nixo transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  {person.website && (
                    <a
                      href={person.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-nixo transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-sm font-medium text-nixo">{person.company}</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {person.bio}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Tab Content: Media ──────────────────────────────────────────────────────

function MediaSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-2">Media</h2>
      <p className="text-base text-text-secondary mb-10">
        Latest coverage and insights about forward deployed engineering
      </p>
      <div className="border-t border-border mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mediaData.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card p-6 group hover:border-border-strong transition-colors block"
          >
            <div className="flex items-start justify-between gap-3 mb-6">
              <h4 className="text-base font-semibold text-text group-hover:text-nixo transition-colors leading-snug">
                {item.title}
              </h4>
              <ExternalLink className="w-4 h-4 text-text-faded group-hover:text-nixo flex-shrink-0 mt-0.5 transition-colors" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-nixo font-medium">{item.source}</span>
              <span className="text-text-faded">&middot;</span>
              <span className="text-text-muted">{item.date}</span>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function ArticleRenderer({ article }) {
  switch (article.type) {
    case 'content':
      return <ContentCard article={article} />;
    case 'insight':
      return <InsightCard article={article} />;
    case 'example':
      return <ExampleCard article={article} />;
    case 'table':
      return <TableCard article={article} />;
    default:
      return null;
  }
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function FDEWiki() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('wiki');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleId, setActiveArticleId] = useState(allArticles[0]?.id);
  const [readingProgress, setReadingProgress] = useState(0);
  const wikiContentRef = useRef(null);
  const contentSectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const el = wikiContentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = el.scrollHeight;

      if (rect.top >= windowH) {
        setReadingProgress(0);
        return;
      }
      if (rect.bottom <= 0) {
        setReadingProgress(100);
        return;
      }

      const scrolled = Math.max(0, windowH - rect.top);
      const scrollable = totalH;
      const pct = Math.min(100, Math.round((scrolled / scrollable) * 100));
      setReadingProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active article tracking via IntersectionObserver
  useEffect(() => {
    const elements = allArticles
      .map((a) => document.getElementById(a.id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveArticleId(visible[0].target.id);
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [searchQuery]);

  // Filter articles by search
  const filteredSections = useMemo(() => {
    if (!searchQuery) return wikiSections;
    const q = searchQuery.toLowerCase();
    return wikiSections
      .map((section) => ({
        ...section,
        articles: section.articles.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.paragraphs?.some((p) => p.toLowerCase().includes(q)) ||
            a.bullets?.some((b) => b.toLowerCase().includes(q)) ||
            a.numberedList?.some((n) => n.toLowerCase().includes(q)) ||
            a.customLines?.some((l) => l.toLowerCase().includes(q))
        ),
      }))
      .filter((s) => s.articles.length > 0);
  }, [searchQuery]);

  const scrollToArticle = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleShare = useCallback((type) => {
    const url = window.location.href;
    const title = 'FDE Wiki - Nixo';
    if (type === 'twitter') {
      window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    } else if (type === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard?.writeText(url);
    }
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-nixo mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Knowledge Base
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-text">FDE</span>
              <br />
              <span className="gradient-text-nixo">Headquarters</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-text mb-4">
              Your comprehensive resource for Forward Deployed Engineering
            </p>
            <p className="text-base text-text-secondary max-w-2xl mx-auto mb-12">
              Everything you need to know about forward deployed engineering — from
              definitions to events and top voices in the community.
            </p>

            {/* Browse label */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                BROWSE
              </span>
              <div className="w-8 h-0.5 bg-nixo rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Browse Cards (Tabs) ─────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {browseCards.map((card, i) => {
            const Icon = card.icon;
            const isActive = activeTab === card.key;
            return (
              <motion.button
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(card.key);
                  contentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-6 text-left group cursor-pointer transition-all rounded-2xl ${
                  isActive
                    ? 'border-2 border-nixo bg-surface'
                    : 'card hover:border-border-strong'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-nixo/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-nixo" />
                </div>
                <h3 className="text-base font-semibold text-text mb-1.5">
                  {card.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-nixo">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── Tab Content ──────────────────────────────────────────────────── */}
      <section ref={contentSectionRef} className="px-6 pt-4 pb-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto">

          {/* Events Tab */}
          {activeTab === 'events' && <EventsSection />}

          {/* Friends Tab */}
          {activeTab === 'friends' && <FriendsSection />}

          {/* Media Tab */}
          {activeTab === 'media' && <MediaSection />}
        </div>
      </section>

      {/* ── FDE Wiki Section (only when wiki tab active) ──────────────────── */}
      {activeTab === 'wiki' && <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-2">
              FDE Wiki
            </h2>
            <p className="text-base text-text-secondary">
              Comprehensive guide to understanding forward deployed engineering
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-12"
          >
            <div className="relative max-w-2xl">
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

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── Main Content ──────────────────────────────────────────── */}
            <div ref={wikiContentRef} className="flex-1 min-w-0">
              {filteredSections.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-text-muted text-lg">No results found for &ldquo;{searchQuery}&rdquo;</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-sm text-nixo hover:text-nixo-light transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              )}

              {filteredSections.map((section, si) => (
                <div key={section.id} className={si > 0 ? 'mt-14' : ''}>
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6" id={section.id}>
                    <div className="w-1 h-8 rounded-full bg-nixo" />
                    <h2 className="text-xl md:text-2xl font-display font-bold text-text">
                      {section.title}
                    </h2>
                  </div>

                  {/* Articles */}
                  <div className="space-y-6">
                    {section.articles.map((article) => (
                      <ArticleRenderer key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28 space-y-6">

                {/* Reading Progress */}
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-text-faded">
                      Reading Progress
                    </span>
                    <span className="text-sm font-bold text-nixo">
                      {readingProgress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-nixo rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${readingProgress}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* On This Page */}
                <div className="card p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-text-faded block mb-3">
                    On This Page
                  </span>
                  <nav className="space-y-0.5">
                    {allArticles.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => scrollToArticle(article.id)}
                        className={`block w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all leading-snug ${
                          activeArticleId === article.id
                            ? 'text-nixo bg-nixo/10'
                            : 'text-text-muted hover:text-text-secondary'
                        }`}
                      >
                        {article.title}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Share */}
                <div className="card p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-text-faded block mb-3">
                    Share
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-10 h-10 rounded-full border border-border hover:border-nixo/50 hover:bg-nixo/10 flex items-center justify-center transition-all group"
                    >
                      <svg className="w-4 h-4 text-text-muted group-hover:text-nixo-light transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-10 h-10 rounded-full border border-border hover:border-nixo/50 hover:bg-nixo/10 flex items-center justify-center transition-all group"
                    >
                      <svg className="w-4 h-4 text-text-muted group-hover:text-nixo-light transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-10 h-10 rounded-full border border-border hover:border-nixo/50 hover:bg-nixo/10 flex items-center justify-center transition-all group"
                    >
                      <LinkIcon className="w-4 h-4 text-text-muted group-hover:text-nixo-light transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="card p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-text-faded block mb-3">
                    Related Articles
                  </span>
                  <div className="space-y-3">
                    {relatedArticles.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => scrollToArticle(article.id)}
                        className="block w-full text-left group"
                      >
                        <p className="text-sm font-semibold text-text group-hover:text-nixo transition-colors">
                          {article.title}
                        </p>
                        <p className="text-xs text-text-faded">
                          {article.category}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Need Help */}
                <div className="card p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-nixo/15 flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-nixo" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text mb-1">Need Help?</p>
                      <p className="text-xs text-text-muted mb-2">
                        Have questions about FDE roles or building your team?
                      </p>
                      <button
                        onClick={() => navigate('/#contact')}
                        className="inline-flex items-center gap-1 text-xs font-medium text-nixo hover:text-nixo-light transition-colors"
                      >
                        Contact an Expert
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>}

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="px-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="card-glass p-12 md:p-16 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-nixo/5" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text mb-3">
                Ready to superpower your forward-deployed service?
              </h2>
              <p className="text-text-secondary mb-8">
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
