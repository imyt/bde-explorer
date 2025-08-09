import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ReportRepository } from "@/components/reports/ReportRepository";
import { LineageGraph } from "@/components/lineage/LineageGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("reports");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const handleViewLineage = (reportId: string) => {
    setSelectedReportId(reportId);
    setActiveTab("lineage");
  };

  const handleBackToReports = () => {
    setSelectedReportId(null);
    setActiveTab("reports");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "reports":
        return <ReportRepository onViewLineage={handleViewLineage} />;
      
      case "lineage":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleBackToReports}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Reports
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Data Lineage Viewer</h2>
                  <p className="text-muted-foreground">Explore comprehensive data lineage from report to source systems</p>
                </div>
              </div>
            </div>
            
            {selectedReportId && <LineageGraph reportId={selectedReportId} />}
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <Card className="border-lineage-report/20 bg-lineage-report/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-lineage-report">Report Layer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Business reports consuming semantic data elements</p>
                </CardContent>
              </Card>
              
              <Card className="border-lineage-bde/20 bg-lineage-bde/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-lineage-bde">BDE Layer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Business Data Elements with semantic definitions</p>
                </CardContent>
              </Card>
              
              <Card className="border-lineage-column/20 bg-lineage-column/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-lineage-column">Column Layer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Physical database columns and technical metadata</p>
                </CardContent>
              </Card>
              
              <Card className="border-lineage-upstream/20 bg-lineage-upstream/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-lineage-upstream">Source Layer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Upstream source systems and data origins</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case "bde":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">BDE Management</h2>
              <p className="text-muted-foreground">Manage Business Data Elements and their semantic definitions</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">BDE management interface coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "columns":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Physical Column Registry</h2>
              <p className="text-muted-foreground">Explore physical database columns discovered via Collibra Edge</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Physical column registry coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "quality":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Data Quality Management</h2>
              <p className="text-muted-foreground">Monitor and manage data quality rules and metrics</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Data quality management interface coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "analytics":
        return <Dashboard />;
      
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              <p className="text-muted-foreground">Configure your data governance platform</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Settings interface coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return <ReportRepository onViewLineage={handleViewLineage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;