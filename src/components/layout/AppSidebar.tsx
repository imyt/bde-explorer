import { Database, GitBranch, FileBarChart, Settings, Shield, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  { id: "reports", label: "Report Repository", icon: FileBarChart },
  { id: "lineage", label: "Lineage Viewer", icon: GitBranch },
  { id: "bde", label: "BDE Management", icon: Target },
  { id: "columns", label: "Physical Columns", icon: Database },
  { id: "quality", label: "Data Quality", icon: Shield },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-governance-blue">BDE Explorer</h1>
        <p className="text-sm text-muted-foreground mt-1">Data Governance Platform</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left h-12 transition-all duration-200",
                activeTab === item.id && "bg-governance-blue text-primary-foreground shadow-sm"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p>Logged in as</p>
          <p className="font-medium text-foreground">Report Owner</p>
        </div>
      </div>
    </div>
  );
}