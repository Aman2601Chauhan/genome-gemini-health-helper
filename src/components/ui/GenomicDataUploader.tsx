
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Upload, File, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { toast } from 'sonner';

type GenomicFileType = 'VCF' | 'BAM' | 'FASTQ' | '23andMe' | 'AncestryDNA' | 'Other';

interface GenomicDataUploaderProps {
  onUploadComplete?: (fileData: string, fileType: GenomicFileType) => void;
  className?: string;
}

const GenomicDataUploader: React.FC<GenomicDataUploaderProps> = ({
  onUploadComplete,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<GenomicFileType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = ['.vcf', '.bam', '.fastq', '.txt', '.csv', '.zip'];
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const detectFileType = (file: File): GenomicFileType => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (extension === 'vcf') return 'VCF';
    if (extension === 'bam') return 'BAM';
    if (extension === 'fastq') return 'FASTQ';
    if (file.name.includes('23andMe')) return '23andMe';
    if (file.name.includes('ancestry')) return 'AncestryDNA';
    
    return 'Other';
  };

  const handleFile = (file: File) => {
    const detectedType = detectFileType(file);
    setFileType(detectedType);
    setUploadedFile(file);
    
    // Simulate upload
    simulateUpload(file, detectedType);
  };

  const simulateUpload = (file: File, type: GenomicFileType) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const totalSize = file.size;
    let loadedSize = 0;
    const chunkSize = totalSize / 100; // Simulate 100 chunks
    
    const interval = setInterval(() => {
      loadedSize += chunkSize;
      const newProgress = Math.round((loadedSize / totalSize) * 100);
      
      setUploadProgress(Math.min(newProgress, 100));
      
      if (newProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        
        // Simulate reading file
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && typeof e.target.result === 'string') {
            if (onUploadComplete) {
              // Only pass first 100 chars of file for demo purposes
              const previewData = e.target.result.substring(0, 100);
              onUploadComplete(previewData, type);
            }
            
            toast.success('File uploaded successfully', {
              description: `Your ${type} file has been processed and is ready for analysis.`
            });
          }
        };
        reader.readAsText(file);
      }
    }, 50);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <Card className={cn("w-full transition-all duration-300", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Genomic Data Upload</CardTitle>
        <CardDescription>
          Upload your genomic data files for AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300",
            isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border",
            isUploading || uploadedFile ? "bg-muted/30" : "hover:bg-muted/10"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!isUploading && !uploadedFile ? handleButtonClick : undefined}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={acceptedFileTypes.join(',')}
            onChange={handleFileInputChange}
          />
          
          {!isUploading && !uploadedFile ? (
            <div className="py-4">
              <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <p className="font-semibold mb-1">Drag & drop your genomic data file here</p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse from your computer
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                <Badge variant="outline">VCF</Badge>
                <Badge variant="outline">BAM</Badge>
                <Badge variant="outline">FASTQ</Badge>
                <Badge variant="outline">23andMe</Badge>
                <Badge variant="outline">AncestryDNA</Badge>
              </div>
            </div>
          ) : isUploading ? (
            <div className="py-6">
              <File className="mx-auto h-8 w-8 text-primary mb-4 animate-pulse" />
              <p className="font-medium mb-2">Uploading {uploadedFile?.name}</p>
              <Progress value={uploadProgress} className="h-2 max-w-md mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
            </div>
          ) : (
            <div className="py-4">
              <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-3" />
              <p className="font-medium mb-1">File uploaded successfully</p>
              <div className="flex items-center justify-center mb-2">
                <Badge className="mr-2 bg-primary/10 text-primary border-primary/20">
                  {fileType}
                </Badge>
                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {uploadedFile?.name}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-1"
                onClick={handleButtonClick}
              >
                Upload a different file
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-2" />
            <p>Your data is processed securely and confidentially.</p>
          </div>
          
          {fileType === 'Other' && uploadedFile && (
            <div className="flex items-center mt-2 text-sm text-amber-500">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <p>
                Unrecognized file format. Results may vary with non-standard formats.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      {uploadedFile && !isUploading && (
        <CardFooter className="flex justify-end">
          <Button className="genomic-gradient-bg shadow-soft">
            Begin Analysis
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GenomicDataUploader;
