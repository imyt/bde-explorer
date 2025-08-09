import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QualityBadge } from "@/components/dashboard/QualityBadge";
import { GitBranch, User, Calendar, Tags } from "lucide-react";

interface ReportCardProps {
  report: {
    id: string;
    name: string;
    description: string;
    owner: string;
    frequency: string;
    bdeCount: number;
    qualityScore: number;
    tags: string[];
    lastUpdated: string;
  };
  onViewLineage: (reportId: string) => void;
}

export function ReportCard({ report, onViewLineage }: ReportCardProps) {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-governance-card hover:border-governance-blue/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-foreground line-clamp-2">
            {report.name}
          </CardTitle>
          <QualityBadge score={report.qualityScore} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {report.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            <span>{report.owner}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{report.frequency}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="font-medium">{report.bdeCount} BDEs linked</span>
          </div>
        </div>
        
        {report.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Tags className="h-3 w-3 text-muted-foreground" />
            {report.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {report.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{report.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="pt-2 border-t border-border">
          <Button
            onClick={() => onViewLineage(report.id)}
            className="w-full bg-governance-blue hover:bg-governance-blue-dark text-white"
          >
            <GitBranch className="h-4 w-4 mr-2" />
            View Lineage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}