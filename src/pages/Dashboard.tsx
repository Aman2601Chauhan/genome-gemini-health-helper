import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GenomicDataUploader from '@/components/ui/GenomicDataUploader';
import AnalysisCard from '@/components/ui/AnalysisCard';
import PredictionChart from '@/components/ui/PredictionChart';
import HealthInsightCard from '@/components/ui/HealthInsightCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Dna, 
  Brain, 
  Search, 
  ArrowRight, 
  RefreshCcw, 
  BarChart3, 
  FilePlus, 
  PanelLeft, 
  PanelRight 
} from 'lucide-react';

const biomarkerPredictionData = [
  { time: 'Jan', value: 65, prediction: undefined },
  { time: 'Feb', value: 72, prediction: undefined },
  { time: 'Mar', value: 68, prediction: undefined },
  { time: 'Apr', value: 75, prediction: undefined },
  { time: 'May', value: 82, prediction: undefined },
  { time: 'Jun', value: 78, prediction: undefined },
  { time: 'Jul', value: 85, prediction: undefined },
  { time: 'Aug', value: 89, prediction: undefined },
  { time: 'Sep', value: undefined, prediction: 92 },
  { time: 'Oct', value: undefined, prediction: 88 },
  { time: 'Nov', value: undefined, prediction: 95 },
  { time: 'Dec', value: undefined, prediction: 91 },
];

const insightCollections = {
  genetic: [
    {
      title: "Personalized Health Insights",
      insights: [
        {
          title: "Vitamin D Metabolism",
          description: "Your genetic variants suggest you may metabolize vitamin D less efficiently.",
          priority: "medium"
        },
        {
          title: "Cardiovascular Profile",
          description: "Your genetic profile indicates a slightly elevated risk for lipid disorders.",
          priority: "low"
        },
        {
          title: "Caffeine Sensitivity",
          description: "You have genetic markers associated with slower caffeine metabolism.",
          priority: "info"
        }
      ]
    },
    {
      title: "Genetic Risk Factors",
      insights: [
        {
          title: "Inflammatory Response",
          description: "Genetic variants suggest you may have a heightened inflammatory response.",
          priority: "medium"
        },
        {
          title: "Detoxification Pathways",
          description: "Your genetic profile shows variations in detoxification enzyme efficiency.",
          priority: "low"
        },
        {
          title: "Oxidative Stress Markers",
          description: "Genetic markers indicate potential for increased oxidative stress.",
          priority: "info"
        }
      ]
    },
    {
      title: "Genomic Analysis Results",
      insights: [
        {
          title: "Methylation Cycle",
          description: "Variations in MTHFR gene affecting methylation pathways detected.",
          priority: "medium"
        },
        {
          title: "Lactose Metabolism",
          description: "Genetic variants consistent with lactose persistence into adulthood.",
          priority: "info"
        },
        {
          title: "Bitter Taste Perception",
          description: "TAS2R38 gene variations indicating heightened sensitivity to bitter compounds.",
          priority: "low"
        }
      ]
    }
  ],
  prediction: [
    {
      title: "AI-Generated Recommendations",
      insights: [
        {
          title: "Consider Vitamin D Supplementation",
          description: "Based on your genetic profile, consider consulting with a healthcare provider about vitamin D supplements.",
          priority: "medium"
        },
        {
          title: "Regular Cholesterol Monitoring",
          description: "Your genetic variants suggest benefit from regular lipid panel testing.",
          priority: "info"
        },
        {
          title: "Caffeine Consumption Timing",
          description: "Consider limiting caffeine intake to morning hours due to your metabolism profile.",
          priority: "low"
        }
      ]
    },
    {
      title: "Future Health Predictions",
      insights: [
        {
          title: "Stress Response Management",
          description: "Your genomic data suggests implementing stress reduction techniques may be beneficial.",
          priority: "medium"
        },
        {
          title: "Exercise Response Optimization",
          description: "Based on your muscle fiber type genes, high-intensity interval training may be most effective.",
          priority: "low"
        },
        {
          title: "Sleep Pattern Recommendation",
          description: "Your circadian rhythm gene variants suggest prioritizing consistent sleep timing.",
          priority: "info"
        }
      ]
    },
    {
      title: "Longevity Insights",
      insights: [
        {
          title: "Telomere Protection Factors",
          description: "AI analysis suggests focusing on antioxidant-rich foods to support telomere health.",
          priority: "medium"
        },
        {
          title: "Cognitive Function Support",
          description: "Recommend regular cognitive challenges based on BDNF gene variations.",
          priority: "low"
        },
        {
          title: "Metabolic Health Trajectory",
          description: "Your genetic profile suggests monitoring insulin sensitivity could be beneficial.",
          priority: "info"
        }
      ]
    }
  ],
  medical: [
    {
      title: "Medication Response Insights",
      insights: [
        {
          title: "Statin Response Variation",
          description: "Genetic variants affecting how you may respond to certain statin medications.",
          priority: "medium"
        },
        {
          title: "NSAID Metabolism",
          description: "Your genetic profile suggests normal metabolism of common NSAIDs.",
          priority: "info"
        },
        {
          title: "Antidepressant Response",
          description: "Variants that may influence response to SSRI antidepressants detected.",
          priority: "low"
        }
      ]
    },
    {
      title: "Pharmaceutical Considerations",
      insights: [
        {
          title: "Beta-Blocker Efficacy",
          description: "Genetic markers suggest potentially reduced efficacy with certain beta-blockers.",
          priority: "medium"
        },
        {
          title: "Opioid Sensitivity",
          description: "CYP2D6 variations indicating potential for altered metabolism of codeine-based medications.",
          priority: "high"
        },
        {
          title: "Warfarin Dosing",
          description: "VKORC1 and CYP2C9 variants suggesting non-standard warfarin dosing may be needed.",
          priority: "medium"
        }
      ]
    },
    {
      title: "Treatment Response Profile",
      insights: [
        {
          title: "Metformin Response",
          description: "Genetic variants suggesting potentially enhanced glucose-lowering effects with metformin.",
          priority: "low"
        },
        {
          title: "PPI Metabolism",
          description: "CYP2C19 variations indicating potential for altered proton pump inhibitor metabolism.",
          priority: "info"
        },
        {
          title: "Antiplatelet Therapy",
          description: "Genetic markers suggesting standard response to clopidogrel therapy.",
          priority: "medium"
        }
      ]
    }
  ],
  lifestyle: [
    {
      title: "Daily Habit Recommendations",
      insights: [
        {
          title: "Optimal Exercise Time",
          description: "Your circadian rhythm genes suggest morning exercise may be most beneficial.",
          priority: "low"
        },
        {
          title: "Dietary Sodium Sensitivity",
          description: "Genetic variants indicate heightened blood pressure response to dietary sodium.",
          priority: "medium"
        },
        {
          title: "Alcohol Metabolism",
          description: "ALDH2 gene variation suggesting slower alcohol metabolism.",
          priority: "info"
        }
      ]
    },
    {
      title: "Wellness Optimizations",
      insights: [
        {
          title: "Omega-3 Metabolism",
          description: "FADS gene cluster variations affecting conversion of plant-based omega-3 fatty acids.",
          priority: "medium"
        },
        {
          title: "Sleep Duration Needs",
          description: "DEC2 gene variants suggesting you may require less sleep than average.",
          priority: "info"
        },
        {
          title: "Caffeine Clearance Rate",
          description: "CYP1A2 variations indicating slower caffeine metabolism than average.",
          priority: "low"
        }
      ]
    },
    {
      title: "Performance Factors",
      insights: [
        {
          title: "Muscle Composition",
          description: "ACTN3 genotype suggesting predisposition to endurance over power activities.",
          priority: "info"
        },
        {
          title: "Recovery Time Requirements",
          description: "IL6 and TNF gene variations suggesting longer recovery periods between intense workouts.",
          priority: "medium"
        },
        {
          title: "Hydration Sensitivity",
          description: "Genetic markers indicating higher than average sensitivity to dehydration.",
          priority: "low"
        }
      ]
    }
  ]
};

const Dashboard = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [displayedInsights, setDisplayedInsights] = useState({
    genetic: null,
    prediction: null,
    medical: null,
    lifestyle: null
  });
  
  useEffect(() => {
    if (analysisComplete) {
      setDisplayedInsights({
        genetic: getRandomInsight('genetic'),
        prediction: getRandomInsight('prediction'),
        medical: getRandomInsight('medical'),
        lifestyle: getRandomInsight('lifestyle')
      });
    }
  }, [analysisComplete]);
  
  const getRandomInsight = (category) => {
    const collection = insightCollections[category];
    return collection[Math.floor(Math.random() * collection.length)];
  };
  
  const refreshInsights = () => {
    setDisplayedInsights({
      genetic: getRandomInsight('genetic'),
      prediction: getRandomInsight('prediction'),
      medical: getRandomInsight('medical'),
      lifestyle: null
    });
    
    toast.info('Refreshing insights...', {
      description: 'Updating with new AI-generated insights based on your genomic data',
    });
  };
  
  const handleUploadComplete = (fileData, fileType) => {
    console.log(`File uploaded: ${fileType}`);
    setFileUploaded(true);
    
    toast.success('Genomic data uploaded successfully', {
      description: 'Your file is ready for analysis',
    });
  };
  
  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    
    toast.info('Analysis started', {
      description: 'Your genomic data is being processed by our AI engine',
    });
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      toast.success('Analysis complete', {
        description: 'Your genomic insights are now available',
      });
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold mb-2">Genomic Analysis Dashboard</h1>
              <p className="text-muted-foreground">
                Upload your genomic data to receive AI-powered health insights
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
            <div className="lg:col-span-2 space-y-6">
              {!fileUploaded ? (
                <div className="bg-white rounded-lg shadow-soft p-6 animate-scale-in">
                  <h2 className="text-xl font-medium mb-4 flex items-center">
                    <Dna className="mr-2 h-5 w-5 text-genomic-blue" />
                    Get Started with Your Analysis
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Upload your genomic data file to begin your personalized health analysis
                  </p>
                  
                  <GenomicDataUploader onUploadComplete={handleUploadComplete} />
                </div>
              ) : !analysisComplete ? (
                <div className="bg-white rounded-lg shadow-soft p-6 text-center animate-scale-in">
                  <div className="py-6">
                    <Brain className="h-12 w-12 mx-auto text-genomic-blue mb-4" />
                    <h2 className="text-xl font-medium mb-2">Your Data is Ready for Analysis</h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Our Gemini 1.5 Flash AI model will analyze your genomic data to provide personalized health insights
                    </p>
                    <Button 
                      className="genomic-gradient-bg shadow-soft"
                      disabled={isAnalyzing}
                      onClick={handleStartAnalysis}
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Start Analysis
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="health">Health</TabsTrigger>
                      <TabsTrigger value="traits">Traits</TabsTrigger>
                      <TabsTrigger value="ancestry">Ancestry</TabsTrigger>
                    </TabsList>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => {
                        toast.info('Exporting report...', {
                          description: 'Your genomic analysis report is being prepared for download',
                        });
                      }}
                    >
                      <FilePlus className="mr-1 h-3.5 w-3.5" />
                      Export Report
                    </Button>
                  </div>
                  
                  <TabsContent value="overview" className="mt-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <PredictionChart 
                        title="Health Biomarker Prediction"
                        description="AI-predicted trends based on your genomic profile"
                        data={biomarkerPredictionData}
                        yAxisLabel="Value"
                        xAxisLabel="Month"
                      />
                      
                      <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-soft p-4">
                          <h3 className="text-lg font-medium mb-3">AI Analysis Summary</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Analysis Coverage</span>
                                <span className="font-medium">96%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-genomic-blue h-2 rounded-full" style={{ width: '96%' }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Confidence Score</span>
                                <span className="font-medium">89%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-genomic-accent h-2 rounded-full" style={{ width: '89%' }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Data Quality</span>
                                <span className="font-medium">92%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-soft p-4">
                          <h3 className="text-lg font-medium mb-3">Key Insights</h3>
                          <ul className="space-y-3">
                            {[
                              "Found 3 genetic variants associated with medication response",
                              "Detected 5 lifestyle factors that may influence your genetic expression",
                              "Identified potential genetic predisposition to vitamin D deficiency"
                            ].map((insight, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                                  <ArrowRight className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-sm">{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mt-6 mb-4">Recent Analyses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AnalysisCard
                        title="Medication Response"
                        description="Analysis of genetic variants related to medication metabolism and efficacy."
                        type="medication"
                        status="complete"
                        timestamp="Today, 2:30 PM"
                        confidence={0.95}
                      />
                      <AnalysisCard
                        title="Disease Risk Assessment"
                        description="Evaluation of genetic markers associated with common health conditions."
                        type="risk"
                        status="complete"
                        timestamp="Today, 2:25 PM"
                        confidence={0.82}
                      />
                      <AnalysisCard
                        title="Ancestry Composition"
                        description="Analysis of your genetic ancestry and population connections."
                        type="ancestry"
                        status="complete"
                        timestamp="Today, 2:20 PM"
                        confidence={0.97}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="health" className="mt-0">
                    <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Health Insights</h3>
                      <p className="text-muted-foreground mb-6">
                        AI-generated insights based on your genomic profile and known health correlations
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnalysisCard
                          title="Cardiovascular Health"
                          description="Analysis of genes related to heart health, cholesterol metabolism, and cardiovascular function."
                          type="risk"
                          status="complete"
                          timestamp="Today, 2:30 PM"
                          confidence={0.88}
                        />
                        <AnalysisCard
                          title="Nutrigenomics"
                          description="How your genes influence your nutritional needs and metabolism of different nutrients."
                          type="trait"
                          status="complete"
                          timestamp="Today, 2:28 PM"
                          confidence={0.92}
                        />
                        <AnalysisCard
                          title="Immune Response"
                          description="Genetic factors affecting your immune system function and response to pathogens."
                          type="risk"
                          status="complete"
                          timestamp="Today, 2:25 PM"
                          confidence={0.85}
                        />
                        <AnalysisCard
                          title="Sleep Patterns"
                          description="Genetic influences on circadian rhythm, sleep quality, and duration."
                          type="trait"
                          status="complete"
                          timestamp="Today, 2:22 PM"
                          confidence={0.78}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="traits" className="mt-0">
                    <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Genetic Traits</h3>
                      <p className="text-muted-foreground mb-6">
                        Discover how your genes influence various physical and physiological traits
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnalysisCard
                          title="Fitness Response"
                          description="How your genes affect your response to different types of exercise and recovery."
                          type="trait"
                          status="complete"
                          timestamp="Today, 2:18 PM"
                          confidence={0.89}
                        />
                        <AnalysisCard
                          title="Taste Perception"
                          description="Genetic variants that influence how you perceive different tastes and food preferences."
                          type="trait"
                          status="complete"
                          timestamp="Today, 2:15 PM"
                          confidence={0.94}
                        />
                        <AnalysisCard
                          title="Caffeine Metabolism"
                          description="How quickly your body processes caffeine and its effects on your system."
                          type="medication"
                          status="complete"
                          timestamp="Today, 2:12 PM"
                          confidence={0.91}
                        />
                        <AnalysisCard
                          title="Skin Characteristics"
                          description="Genetic factors influencing skin properties, aging, and sun sensitivity."
                          type="trait"
                          status="complete"
                          timestamp="Today, 2:10 PM"
                          confidence={0.86}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ancestry" className="mt-0">
                    <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Ancestry Composition</h3>
                      <p className="text-muted-foreground mb-6">
                        Explore your genetic heritage and ancestral connections
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnalysisCard
                          title="Geographic Origins"
                          description="Analysis of your ancestral origins across different geographical regions."
                          type="ancestry"
                          status="complete"
                          timestamp="Today, 2:05 PM"
                          confidence={0.95}
                        />
                        <AnalysisCard
                          title="Haplogroup Analysis"
                          description="Information about your maternal and paternal lineages throughout human history."
                          type="ancestry"
                          status="complete"
                          timestamp="Today, 2:00 PM"
                          confidence={0.93}
                        />
                        <AnalysisCard
                          title="Neanderthal Ancestry"
                          description="Percentage of Neanderthal DNA in your genome and associated traits."
                          type="ancestry"
                          status="complete"
                          timestamp="Today, 1:55 PM"
                          confidence={0.97}
                        />
                        <AnalysisCard
                          title="Population Connections"
                          description="Your genetic similarity to different population groups around the world."
                          type="ancestry"
                          status="complete"
                          timestamp="Today, 1:50 PM"
                          confidence={0.92}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
            
            <div className="space-y-6">
              {analysisComplete && (
                <div className="space-y-6 animate-slide-up">
                  {displayedInsights.genetic && (
                    <HealthInsightCard
                      category="genetic"
                      title={displayedInsights.genetic.title}
                      insights={displayedInsights.genetic.insights}
                    />
                  )}
                  
                  {displayedInsights.prediction && (
                    <HealthInsightCard
                      category="prediction"
                      title={displayedInsights.prediction.title}
                      insights={displayedInsights.prediction.insights}
                    />
                  )}
                  
                  {displayedInsights.medical && (
                    <HealthInsightCard
                      category="medical"
                      title={displayedInsights.medical.title}
                      insights={displayedInsights.medical.insights}
                    />
                  )}
                  
                  {displayedInsights.lifestyle && (
                    <HealthInsightCard
                      category="lifestyle"
                      title={displayedInsights.lifestyle.title}
                      insights={displayedInsights.lifestyle.insights}
                    />
                  )}
                </div>
              )}
              
              {fileUploaded && (
                <div className="bg-white rounded-lg shadow-soft p-6 animate-fade-in">
                  <h3 className="font-medium mb-4 flex items-center">
                    <FilePlus className="mr-2 h-4 w-4 text-primary" />
                    Upload Additional Data
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add more genomic data to enhance your analysis and insights
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setFileUploaded(false);
                      setAnalysisComplete(false);
                      
                      toast.info('Ready for new data', {
                        description: 'You can now upload a different genomic data file',
                      });
                    }}
                  >
                    Upload New File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
