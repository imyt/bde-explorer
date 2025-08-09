import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReportCard } from "./ReportCard";

interface ReportRepositoryProps {
  onViewLineage: (reportId: string) => void;
}

const sampleReports = [
  {
    id: "report-1",
    name: "Sales Performance Dashboard",
    description: "Monthly sales performance metrics including revenue, customer acquisition, and regional breakdowns for executive reporting.",
    owner: "Sarah Chen",
    frequency: "Daily",
    bdeCount: 8,
    qualityScore: 92,
    tags: ["Sales", "Executive", "KPI"],
    lastUpdated: "2024-01-08"
  },
  {
    id: "report-2",
    name: "Customer Segmentation Analysis",
    description: "Detailed customer segmentation analysis based on demographics, purchase behavior, and engagement patterns.",
    owner: "Mike Rodriguez",
    frequency: "Weekly",
    bdeCount: 12,
    qualityScore: 87,
    tags: ["Customer", "Segmentation", "Marketing"],
    lastUpdated: "2024-01-07"
  },
  {
    id: "report-3",
    name: "Financial Risk Assessment",
    description: "Comprehensive financial risk analysis including credit scores, payment history, and market volatility indicators.",
    owner: "Emily Watson",
    frequency: "Monthly",
    bdeCount: 15,
    qualityScore: 95,
    tags: ["Finance", "Risk", "Compliance"],
    lastUpdated: "2024-01-06"
  },
  {
    id: "report-4",
    name: "Operational Efficiency Metrics",
    description: "Key operational metrics including throughput, quality rates, and resource utilization across manufacturing facilities.",
    owner: "David Kim",
    frequency: "Daily",
    bdeCount: 6,
    qualityScore: 78,
    tags: ["Operations", "Manufacturing", "Efficiency"],
    lastUpdated: "2024-01-08"
  },
  {
    id: "report-5",
    name: "Employee Performance Review",
    description: "Quarterly employee performance analysis including productivity metrics, skill assessments, and career development tracking.",
    owner: "Lisa Thompson",
    frequency: "Quarterly",
    bdeCount: 9,
    qualityScore: 83,
    tags: ["HR", "Performance", "Development"],
    lastUpdated: "2024-01-05"
  },
  {
    id: "report-6",
    name: "Supply Chain Analytics",
    description: "End-to-end supply chain visibility including inventory levels, supplier performance, and logistics optimization.",
    owner: "James Wilson",
    frequency: "Weekly",
    bdeCount: 18,
    qualityScore: 89,
    tags: ["Supply Chain", "Logistics", "Inventory"],
    lastUpdated: "2024-01-07"
  }
];

export function ReportRepository({ onViewLineage }: ReportRepositoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState(sampleReports);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = sampleReports.filter(report =>
      report.name.toLowerCase().includes(value.toLowerCase()) ||
      report.description.toLowerCase().includes(value.toLowerCase()) ||
      report.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredReports(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Report Repository</h2>
          <p className="text-muted-foreground">Explore and manage your organization's reports with comprehensive lineage tracking</p>
        </div>
        <Button className="bg-governance-blue hover:bg-governance-blue-dark text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Report
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports, descriptions, or tags..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onViewLineage={onViewLineage}
          />
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reports found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}