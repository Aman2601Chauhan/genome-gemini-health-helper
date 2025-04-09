import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Dna, 
  Brain, 
  Heart, 
  ChartLine, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  Microscope, 
  Network, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((section) => {
      observer.observe(section);
      section.classList.add('opacity-0'); // Start invisible
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 py-1 px-3 bg-primary/10 text-primary border-primary/20 animate-fade-in">
            Powered by Gemini 2.0 Flash AI
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 genomic-gradient-text animate-slide-down">
            Unlock Your Genomic Potential
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            Transform genetic data into personalized healthcare insights with AI-powered precision medicine, delivering targeted treatment strategies and improved patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-scale-in">
            <Button 
              size="lg" 
              className="genomic-gradient-bg hover:scale-105 transition-all duration-300 shadow-soft"
              asChild
            >
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group"
              onClick={scrollToFeatures}
            >
              Explore Features
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Key Benefits */}
      <section className="py-16 bg-genomic-gray">
        <div className="container mx-auto px-4 animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transforming Healthcare Through Genomics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform analyzes genetic data to provide actionable insights for better healthcare outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Dna className="h-8 w-8 text-genomic-blue" />,
                title: "Precision Medicine",
                description: "Tailored healthcare strategies based on your unique genetic makeup."
              },
              {
                icon: <Brain className="h-8 w-8 text-genomic-blue" />,
                title: "AI Insights",
                description: "Advanced AI models analyze complex genetic patterns to uncover key health indicators."
              },
              {
                icon: <Heart className="h-8 w-8 text-genomic-blue" />,
                title: "Improved Outcomes",
                description: "Better treatment efficacy and reduced adverse effects through personalized approaches."
              },
              {
                icon: <ChartLine className="h-8 w-8 text-genomic-blue" />,
                title: "Predictive Analytics",
                description: "Forecast potential health risks and optimize preventive care strategies."
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-lg shadow-soft hover-card-effect animation-delay-100"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-16">
        <div className="container mx-auto px-4 animate-on-scroll">
          <div className="text-center mb-12">
            <Badge className="mb-4 py-1 px-3 bg-primary/10 text-primary border-primary/20">
              Powerful Features
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Advanced Genomic Analysis Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers comprehensive tools for analyzing and interpreting genomic data,
              providing actionable insights for healthcare professionals and patients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                {
                  icon: <Microscope className="h-5 w-5 text-genomic-blue" />,
                  title: "Advanced Genetic Analysis",
                  description: "Process and analyze genomic data from various sources including VCF, BAM, FASTQ, and consumer genetic testing files."
                },
                {
                  icon: <Network className="h-5 w-5 text-genomic-blue" />,
                  title: "AI-Powered Insights",
                  description: "Leverage Gemini 2.0 Flash AI to identify patterns and correlations in genetic data that may influence health outcomes."
                },
                {
                  icon: <ChartLine className="h-5 w-5 text-genomic-blue" />,
                  title: "Predictive Health Analytics",
                  description: "Forecast potential health risks and develop personalized prevention strategies based on genetic predispositions."
                },
                {
                  icon: <ShieldCheck className="h-5 w-5 text-genomic-blue" />,
                  title: "Secure and Private",
                  description: "Your genetic data is encrypted and protected with industry-leading security practices, ensuring privacy and confidentiality."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`flex p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-soft animation-delay-${(index + 1) * 100}`}
                >
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-md flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-soft border border-border/40 flex items-center justify-center">
              <div className="text-center">
                <Badge variant="outline" className="mb-4">
                  Supabase Integrated
                </Badge>
                <h3 className="text-xl font-semibold mb-2">Enhanced with Cloud Storage</h3>
                <p className="text-muted-foreground mb-6">
                  Securely store and analyze your genomic data with our Supabase-powered backend
                </p>
                <Button 
                  className="genomic-gradient-bg shadow-soft"
                  asChild
                >
                  <Link to="/dashboard">Explore Analytics</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-genomic-gray">
        <div className="container mx-auto px-4 animate-on-scroll">
          <div className="text-center mb-12">
            <Badge className="mb-4 py-1 px-3 bg-primary/10 text-primary border-primary/20">
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold mb-4">How Genome Gemini Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A seamless experience from data upload to personalized insights
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-muted -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: 1,
                  title: "Upload Data",
                  description: "Securely upload your genomic data from various testing sources.",
                  delay: "animation-delay-100"
                },
                {
                  step: 2,
                  title: "AI Analysis",
                  description: "Our Gemini AI analyzes your genetic information in seconds.",
                  delay: "animation-delay-200"
                },
                {
                  step: 3,
                  title: "Generate Insights",
                  description: "Receive personalized health insights and recommendations.",
                  delay: "animation-delay-300"
                },
                {
                  step: 4,
                  title: "Take Action",
                  description: "Use your insights to make informed healthcare decisions.",
                  delay: "animation-delay-400"
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg p-6 shadow-soft ${step.delay}`}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold mb-4 mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-center">{step.title}</h3>
                  <p className="text-muted-foreground text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 animate-on-scroll">
          <div className="text-center mb-12">
            <Badge className="mb-4 py-1 px-3 bg-primary/10 text-primary border-primary/20">
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Transforming Patient Outcomes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how our platform is making a difference in precision healthcare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The genomic analysis identified medication sensitivities I was unaware of, helping my doctor adjust my treatment plan and eliminate side effects I had been struggling with for years.",
                name: "Sarah Johnson",
                title: "Patient",
                delay: "animation-delay-100"
              },
              {
                quote: "As a healthcare provider, this platform has revolutionized how I approach treatment plans. The AI insights provide valuable information that helps me deliver truly personalized care to my patients.",
                name: "Dr. Michael Chen",
                title: "Oncologist",
                delay: "animation-delay-200"
              },
              {
                quote: "The predictive analytics helped identify my risk for developing certain conditions, allowing me to implement preventive measures early. This proactive approach has been invaluable for my long-term health.",
                name: "Robert Williams",
                title: "Patient",
                delay: "animation-delay-300"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`glassmorphism p-6 rounded-lg ${testimonial.delay}`}
              >
                <div className="mb-4 text-genomic-blue">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="italic mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-genomic-navy text-white">
        <div className="container mx-auto px-4 animate-on-scroll">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Healthcare Journey?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of individuals and healthcare providers who are already benefiting from AI-powered genomic insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-genomic-navy hover:bg-white/90 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/dashboard">
                  Start Your Analysis
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
