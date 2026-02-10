import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';

// Import all integration logos
import slackLogo from '../assets/logos/slack-logo.webp';
import githubLogo from '../assets/logos/github-logo.svg';
import linearLogo from '../assets/logos/linear-logo.webp';
import jiraLogo from '../assets/logos/jira-logo.svg';
import notionLogo from '../assets/logos/Notion-logo.svg.png';
import discordLogo from '../assets/logos/discord-logo.png';
import salesforceLogo from '../assets/logos/Salesforce.com_logo.svg.png';
import hubspotLogo from '../assets/logos/hubspot-logo.png';
import gitlabLogo from '../assets/logos/gitlab_logo_icon_169112.webp';
import confluenceLogo from '../assets/logos/confluence-1.svg';
import zendeskLogo from '../assets/logos/Zendesk_logo.svg.png';

const integrationLogos = [
  { src: slackLogo, alt: 'Slack', title: 'Slack' },
  { src: githubLogo, alt: 'GitHub', title: 'GitHub', invert: true },
  { src: linearLogo, alt: 'Linear', title: 'Linear', invert: true },
  { src: jiraLogo, alt: 'Jira', title: 'Jira' },
  { src: notionLogo, alt: 'Notion', title: 'Notion' },
  { src: discordLogo, alt: 'Discord', title: 'Discord' },
  { src: salesforceLogo, alt: 'Salesforce', title: 'Salesforce' },
  { src: hubspotLogo, alt: 'HubSpot', title: 'HubSpot' },
  { src: gitlabLogo, alt: 'GitLab', title: 'GitLab' },
  { src: confluenceLogo, alt: 'Confluence', title: 'Confluence' },
  { src: zendeskLogo, alt: 'Zendesk', title: 'Zendesk' },
];

export default function Integrations() {
  return (
    <section id="integrations" className="relative py-32 px-6 overflow-hidden">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" />
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-nixo/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-electric" />
            Integrations
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text mb-6 tracking-tight">
            Connect your
            <br />
            <span className="gradient-text-nixo">entire stack</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Nixo pulls context from Slack, GitHub, Linear, and your CRM—so you never 
            have to chase customers for details again.
          </p>
        </motion.div>

        {/* Logo Loop - Full Width */}
        <div className="absolute left-0 right-0 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <LogoLoop
              logos={integrationLogos}
              speed={40}
              direction="left"
              logoHeight={50}
              gap={100}
              hoverSpeed={15}
              scaleOnHover
              fadeOut
              fadeOutColor="transparent"
              ariaLabel="Integration partners"
              renderItem={(item) => (
                <img
                  src={item.src}
                  alt={item.alt}
                  title={item.title}
                  className={`h-[50px] w-auto object-contain transition-transform duration-300 hover:scale-110 ${
                    item.invert ? 'dark-invert' : ''
                  }`}
                  draggable={false}
                />
              )}
            />
          </motion.div>
        </div>
        {/* Spacer for the absolute positioned logo loop */}
        <div className="h-24" />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-text-muted mb-3">Don't see your tool?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-nixo-light hover:text-nixo transition-colors font-medium"
          >
            Request an integration →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
