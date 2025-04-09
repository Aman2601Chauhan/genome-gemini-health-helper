
import React, { useState } from 'react';
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
import { analyzeGenomicData } from '@/services/geminiService';
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

const Dashboard = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [fileData, setFileData] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<string | null>(null);
  const [healthInsights, setHealthInsights] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [medicationInsights, setMedicationInsights] = useState<any[]>([]);
  
  const handleUploadComplete = (fileData: string, fileType: string) => {
    setFileData(fileData);
    setFileUploaded(true);
    
    toast.success('Genomic data uploaded successfully', {
      description: 'Your file is ready for analysis',
    });
  };
  
  const handleStartAnalysis = async () => {
    if (!fileData) {
      toast.error('No genomic data available for analysis');
      return;
    }

    setIsAnalyzing(true);
    
    toast.info('Analysis started', {
      description: 'Your genomic data is being processed by our AI engine',
    });
    
    try {
      // Call the Gemini API through our service
      const result = await analyzeGenomicData(fileData);
      setAnalysisResults(result);
      
      // Parse insights from the analysis (simplified parsing logic)
      const healthItems = extractInsightsFromAnalysis(result, 'health', 3);
      const recommendationItems = extractInsightsFromAnalysis(result, 'recommendations', 3);
      const medicationItems = extractInsightsFromAnalysis(result, 'medication', 3);
      
      setHealthInsights(healthItems);
      setRecommendations(recommendationItems);
      setMedicationInsights(medicationItems);
      
      setAnalysisComplete(true);
      toast.success('Analysis complete', {
        description: 'Your genomic insights are now available',
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Analysis failed', {
        description: 'There was an error processing your genomic data',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Extract insights from analysis text
  const extractInsightsFromAnalysis = (text: string, category: string, count: number) => {
    // Simple extraction logic - in a real app this would be more sophisticated
    const lines = text.split('\n');
    const relevantLines = lines.filter(line => 
      line.toLowerCase().includes(category) || 
      (category === 'health' && line.toLowerCase().includes('risk')) ||
      (category === 'recommendations' && line.toLowerCase().includes('suggest')) ||
      (category === 'medication' && line.toLowerCase().includes('drug'))
    );
    
    const results = [];
    for (let i = 0; i < Math.min(count, relevantLines.length); i++) {
      const line = relevantLines[i];
      
      // Extract a title and description as best we can
      const title = line.split(':')[0] || `${category.charAt(0).toUpperCase() + category.slice(1)} Insight ${i+1}`;
      const description = line.split(':').slice(1).join(':') || line;
      
      // Assign a priority based on keywords
      let priority: 'high' | 'medium' | 'low' | 'info' = 'info';
      if (line.toLowerCase().includes('high risk') || line.toLowerCase().includes('urgent') || 
          line.toLowerCase().includes('important')) {
        priority = 'high';
      } else if (line.toLowerCase().includes('medium risk') || line.toLowerCase().includes('moderate') || 
                line.toLowerCase().includes('consider')) {
        priority = 'medium';
      } else if (line.toLowerCase().includes('low risk') || line.toLowerCase().includes('minimal') || 
                line.toLowerCase().includes('minor')) {
        priority = 'low';
      }
      
      results.push({
        title: title.trim().substring(0, 50),
        description: description.trim().substring(0, 100),
        priority
      });
    }
    
    // If we didn't find enough insights, add placeholders
    while (results.length < count) {
      results.push({
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Analysis`,
        description: 'Insufficient data for detailed analysis in this category.',
        priority: 'info'
      });
    }
    
    return results;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
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
                onClick={() => {
                  toast.info('Refreshing data...', {
                    description: 'Updating your insights with the latest analysis',
                  });
                }}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
            {/* Main Content - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Upload Section */}
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
                    <div className="bg-white rounded-lg shadow-soft p-6">
                      <h3 className="text-lg font-medium mb-4">Gemini AI Analysis Results</h3>
                      
                      <div className="prose max-w-full">
                        {analysisResults ? (
                          <div className="whitespace-pre-wrap text-sm">
                            {analysisResults}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No analysis results available.</p>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="health" className="mt-0">
                    <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Health Insights</h3>
                      <p className="text-muted-foreground mb-6">
                        AI-generated insights based on your genomic profile and known health correlations
                      </p>
                      
                      {analysisResults ? (
                        <div className="prose max-w-full whitespace-pre-wrap text-sm">
                          {analysisResults}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No health insights available.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="traits" className="mt-0">
                    <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Genetic Traits</h3>
                      <p className="text-muted-foreground mb-6">
                        Discover how your genes influence various physical and physiological traits
                      </p>
                      
                      {analysisResults ? (
                        <div className="prose max-w-full whitespace-pre-wrap text-sm">
                          {analysisResults}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No trait insights available.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ancestry" className="mt-0">
                    <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Ancestry Composition</h3>
                      <p className="text-muted-foreground mb-6">
                        Explore your genetic heritage and ancestral connections
                      </p>
                      
                      {analysisResults ? (
                        <div className="prose max-w-full whitespace-pre-wrap text-sm">
                          {analysisResults}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No ancestry insights available.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
            
            {/* Sidebar - 1/3 width on large screens */}
            <div className="space-y-6">
              {/* If analysis is complete, show analysis results */}
              {analysisComplete && (
                <div className="space-y-6 animate-slide-up">
                  <HealthInsightCard
                    category="genetic"
                    title="Personalized Health Insights"
                    insights={healthInsights}
                  />
                  
                  <HealthInsightCard
                    category="prediction"
                    title="AI-Generated Recommendations"
                    insights={recommendations}
                  />
                  
                  <HealthInsightCard
                    category="medical"
                    title="Medication Response Insights"
                    insights={medicationInsights}
                  />
                </div>
              )}
              
              {/* Upload New Data */}
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
                      setAnalysisResults(null);
                      setHealthInsights([]);
                      setRecommendations([]);
                      setMedicationInsights([]);
                      setFileData(null);
                      
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
