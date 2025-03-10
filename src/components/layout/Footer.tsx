
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Dna, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API', href: '#api' },
        { name: 'Partners', href: '#partners' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#docs' },
        { name: 'Guides', href: '#guides' },
        { name: 'Research', href: '#research' },
        { name: 'Case Studies', href: '#case-studies' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Team', href: '#team' },
        { name: 'Careers', href: '#careers' },
        { name: 'Privacy', href: '#privacy' }
      ]
    }
  ];

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xs pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Dna className="w-7 h-7 text-genomic-blue" aria-hidden="true" />
              <span className="text-xl font-semibold genomic-gradient-text">Genome Gemini</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Advancing precision medicine through AI-powered genomic analysis. 
              Enabling personalized healthcare solutions and improved patient outcomes.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#github" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#twitter" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@genomegemini.com" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Nav sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-medium text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground text-sm mb-2 flex items-center">
            Built with <Heart className="w-4 h-4 mx-1 text-destructive animate-pulse" /> and precision
          </p>
          <p className="text-muted-foreground text-sm">
            © {currentYear} Genome Gemini. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
