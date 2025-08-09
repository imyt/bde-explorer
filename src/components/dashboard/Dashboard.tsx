import { StatsCard } from "./StatsCard";
import { FileBarChart, Database, Target, Shield, TrendingUp, Users } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Data Governance Overview</h2>
        <p className="text-muted-foreground">Monitor your organization's data governance health and lineage coverage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total Reports"
          value={47}
          change="+3 this month"
          icon={FileBarChart}
          trend="up"
        />
        <StatsCard
          title="Business Data Elements"
          value={312}
          change="+15 this week"
          icon={Target}
          trend="up"
        />
        <StatsCard
          title="Physical Columns"
          value="1,847"
          change="+42 discovered"
          icon={Database}
          trend="up"
        />
        <StatsCard
          title="Data Quality Score"
          value="87%"
          change="+2% improvement"
          icon={Shield}
          trend="up"
        />
        <StatsCard
          title="Lineage Coverage"
          value="94%"
          change="Stable"
          icon={TrendingUp}
          trend="neutral"
        />
        <StatsCard
          title="Active Users"
          value={23}
          change="8 online now"
          icon={Users}
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Data Quality Trends</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Excellent (90%+)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-muted rounded-full">
                  <div className="h-2 bg-quality-excellent rounded-full" style={{ width: "68%" }}></div>
                </div>
                <span className="text-sm font-medium">68%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Good (75-89%)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-muted rounded-full">
                  <div className="h-2 bg-quality-good rounded-full" style={{ width: "22%" }}></div>
                </div>
                <span className="text-sm font-medium">22%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Warning (60-74%)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-muted rounded-full">
                  <div className="h-2 bg-quality-warning rounded-full" style={{ width: "8%" }}></div>
                </div>
                <span className="text-sm font-medium">8%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Poor (&lt;60%)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-muted rounded-full">
                  <div className="h-2 bg-quality-poor rounded-full" style={{ width: "2%" }}></div>
                </div>
                <span className="text-sm font-medium">2%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-governance-blue rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">New BDE created: Customer Lifetime Value</p>
                <p className="text-xs text-muted-foreground">2 hours ago by Sarah Chen</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-quality-excellent rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">Data quality rule passed: Email Validation</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-lineage-column rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">42 new columns discovered in CRM database</p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-quality-warning rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">Quality score decreased for Financial Risk data</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}