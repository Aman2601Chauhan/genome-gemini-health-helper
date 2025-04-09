
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HealthInsightCard from '@/components/ui/HealthInsightCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

const insightCollections = {
  genetic: [
    {
      title: "DNA Expression Patterns",
      insights: [
        {
          title: "Gene Silencing Mechanisms",
          description: "Your genomic profile indicates normal methylation patterns in key regulatory regions.",
          priority: "low"
        },
        {
          title: "Telomere Maintenance",
          description: "Genetic variants associated with standard telomere maintenance detected.",
          priority: "info"
        },
        {
          title: "Epigenetic Markers",
          description: "Several epigenetic markers suggest optimal gene expression regulation.",
          priority: "low"
        }
      ]
    },
    {
      title: "Genetic Metabolism Insights",
      insights: [
        {
          title: "COMT Enzyme Variation",
          description: "Your Val158Met polymorphism suggests efficient dopamine processing.",
          priority: "medium"
        },
        {
          title: "MTHFR Enzyme Function",
          description: "Heterozygous C677T mutation detected, potentially affecting folate metabolism.",
          priority: "medium"
        },
        {
          title: "Sulfation Pathways",
          description: "Genetic markers indicate standard efficiency in sulfation detoxification pathways.",
          priority: "info"
        }
      ]
    },
    {
      title: "Genetic Susceptibility Profile",
      insights: [
        {
          title: "Inflammatory Response Genes",
          description: "Variations in IL-6 and TNF-alpha genes suggesting potential for heightened inflammation.",
          priority: "medium"
        },
        {
          title: "Oxidative Stress Management",
          description: "SOD2 gene variation associated with standard antioxidant enzyme function.",
          priority: "low"
        },
        {
          title: "Cellular Repair Mechanisms",
          description: "BRCA1/2 variants within normal parameters for DNA repair functions.",
          priority: "info"
        }
      ]
    }
  ],
  medical: [
    {
      title: "Pharmacogenomic Profile",
      insights: [
        {
          title: "CYP2D6 Enzyme Activity",
          description: "Genetic profile suggests extensive metabolizer status for medications processed by CYP2D6.",
          priority: "medium"
        },
        {
          title: "P-glycoprotein Expression",
          description: "MDR1 gene variants indicating potential for altered drug transport across cell membranes.",
          priority: "high"
        },
        {
          title: "Phase II Metabolism",
          description: "UGT1A1 gene function appears standard, suggesting normal processing of certain medications.",
          priority: "info"
        }
      ]
    },
    {
      title: "Treatment Response Predictions",
      insights: [
        {
          title: "Beta-2 Receptor Sensitivity",
          description: "ADRB2 gene variants suggesting potential variable response to beta-agonist medications.",
          priority: "medium"
        },
        {
          title: "Vitamin K Antagonist Response",
          description: "VKORC1 variations indicating potential need for non-standard dosing of warfarin.",
          priority: "high"
        },
        {
          title: "Statin Response Profile",
          description: "SLCO1B1 gene appears standard, suggesting normal risk for statin-related side effects.",
          priority: "low"
        }
      ]
    },
    {
      title: "Specialized Medical Considerations",
      insights: [
        {
          title: "Anesthesia Sensitivity",
          description: "No variants detected in RYR1 gene associated with malignant hyperthermia.",
          priority: "info"
        },
        {
          title: "Platelet Function",
          description: "P2Y12 receptor gene variants suggesting standard response to antiplatelet therapies.",
          priority: "medium"
        },
        {
          title: "ACE Inhibitor Response",
          description: "ACE gene insertion/deletion polymorphism detected, potentially affecting medication response.",
          priority: "medium"
        }
      ]
    }
  ],
  lifestyle: [
    {
      title: "Nutritional Genomics",
      insights: [
        {
          title: "Lactose Metabolism",
          description: "LCT gene variants indicating persistence of lactase enzyme production into adulthood.",
          priority: "info"
        },
        {
          title: "Saturated Fat Response",
          description: "APOA2 gene variation suggesting heightened sensitivity to dietary saturated fat intake.",
          priority: "medium"
        },
        {
          title: "Bitter Taste Perception",
          description: "TAS2R38 gene variants associated with heightened sensitivity to bitter compounds.",
          priority: "low"
        }
      ]
    },
    {
      title: "Physical Activity Insights",
      insights: [
        {
          title: "Muscle Fiber Composition",
          description: "ACTN3 R577X genotype suggesting higher proportion of fast-twitch muscle fibers.",
          priority: "info"
        },
        {
          title: "Exercise Recovery",
          description: "IL6 gene variations suggesting potential for prolonged recovery needs after intense exercise.",
          priority: "medium"
        },
        {
          title: "Tendon Injury Susceptibility",
          description: "COL5A1 gene variants associated with increased connective tissue elasticity.",
          priority: "low"
        }
      ]
    },
    {
      title: "Behavioral Genetic Factors",
      insights: [
        {
          title: "Circadian Rhythm Tendencies",
          description: "CLOCK gene polymorphisms suggesting natural tendency toward evening chronotype.",
          priority: "medium"
        },
        {
          title: "Reward Sensitivity",
          description: "DRD2 gene variants associated with standard dopamine receptor density and function.",
          priority: "info"
        },
        {
          title: "Stress Response Regulation",
          description: "COMT Val158Met polymorphism suggesting efficient catecholamine processing under stress.",
          priority: "low"
        }
      ]
    }
  ],
  prediction: [
    {
      title: "Future Health Projections",
      insights: [
        {
          title: "Metabolic Pathway Optimization",
          description: "Based on your genetic profile, optimizing vitamin B intake may support methylation pathways.",
          priority: "medium"
        },
        {
          title: "Cognitive Function Support",
          description: "BDNF gene variations suggest potential benefit from regular cognitive challenges and exercise.",
          priority: "info"
        },
        {
          title: "Immune System Modulation",
          description: "Consider seasonal immune support based on your genetic inflammatory response profile.",
          priority: "low"
        }
      ]
    },
    {
      title: "Personalized Wellness Strategies",
      insights: [
        {
          title: "Optimal Exercise Timing",
          description: "Based on circadian gene variations, morning exercise may align better with your genetic profile.",
          priority: "medium"
        },
        {
          title: "Stress Reduction Approaches",
          description: "Your genetic stress response profile suggests benefit from mindfulness-based practices.",
          priority: "medium"
        },
        {
          title: "Sleep Quality Enhancement",
          description: "Consider limiting blue light exposure based on melanopsin sensitivity gene variants.",
          priority: "info"
        }
      ]
    },
    {
      title: "Longevity Enhancement Factors",
      insights: [
        {
          title: "Cellular Renewal Support",
          description: "Your sirtuin gene variants suggest potential benefit from intermittent calorie restriction.",
          priority: "medium"
        },
        {
          title: "Oxidative Balance",
          description: "Based on SOD/catalase gene function, consider optimizing antioxidant intake from food sources.",
          priority: "low"
        },
        {
          title: "Mitochondrial Health",
          description: "Your genetic variations suggest potential benefit from strategies supporting mitochondrial biogenesis.",
          priority: "info"
        }
      ]
    }
  ]
};

const Insights = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('genetic');
  const [displayedInsights, setDisplayedInsights] = useState(() => {
    // Initialize with random insights from each category
    return {
      genetic: getRandomInsights('genetic', 2),
      medical: getRandomInsights('medical', 2),
      lifestyle: getRandomInsights('lifestyle', 2),
      prediction: getRandomInsights('prediction', 2)
    };
  });

  function getRandomInsights(category: keyof typeof insightCollections, count: number) {
    const collection = insightCollections[category];
    const selected = [];
    const availableIndices = Array.from({ length: collection.length }, (_, i) => i);
    
    for (let i = 0; i < count && availableIndices.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedIndex = availableIndices[randomIndex];
      selected.push(collection[selectedIndex]);
      availableIndices.splice(randomIndex, 1);
    }
    
    return selected;
  }
  
  const refreshInsights = () => {
    setDisplayedInsights({
      genetic: getRandomInsights('genetic', 2),
      medical: getRandomInsights('medical', 2),
      lifestyle: getRandomInsights('lifestyle', 2),
      prediction: getRandomInsights('prediction', 2)
    });
    
    toast.info('Refreshing insights...', {
      description: 'Updating with new AI-generated insights based on your genomic data',
    });
  };

  const filteredInsights = searchQuery 
    ? Object.fromEntries(
        Object.entries(insightCollections).map(([category, insights]) => [
          category,
          insights.filter(insight => 
            insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insight.insights.some(item => 
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        ])
      )
    : insightCollections;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold mb-2">Genomic Insights</h1>
              <p className="text-muted-foreground">
                Explore AI-powered insights generated from your genomic data
              </p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search insights..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={refreshInsights}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="genetic" value={activeCategory} onValueChange={setActiveCategory} className="animate-fade-in">
            <TabsList className="mb-6">
              <TabsTrigger value="genetic">Genetic</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              <TabsTrigger value="prediction">Predictions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="genetic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedInsights.genetic.map((insight, index) => (
                  <HealthInsightCard
                    key={`genetic-${index}`}
                    category="genetic"
                    title={insight.title}
                    insights={insight.insights}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="medical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedInsights.medical.map((insight, index) => (
                  <HealthInsightCard
                    key={`medical-${index}`}
                    category="medical"
                    title={insight.title}
                    insights={insight.insights}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="lifestyle" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedInsights.lifestyle.map((insight, index) => (
                  <HealthInsightCard
                    key={`lifestyle-${index}`}
                    category="lifestyle"
                    title={insight.title}
                    insights={insight.insights}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="prediction" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedInsights.prediction.map((insight, index) => (
                  <HealthInsightCard
                    key={`prediction-${index}`}
                    category="prediction"
                    title={insight.title}
                    insights={insight.insights}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Insights;
