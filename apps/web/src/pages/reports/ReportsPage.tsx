import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { KpiGrid } from '@/components/molecules/KpiGrid';
import { StatTile } from '@/components/molecules/StatTile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useReportSummary } from '@/features/reports/hooks/useReports';

export default function ReportsPage() {
  const report = useReportSummary();

  const stockChartData = report.data
    ? [
        { name: 'Adequate', value: report.data.stockByStatus.adequate },
        { name: 'Low', value: report.data.stockByStatus.low },
        { name: 'Critical', value: report.data.stockByStatus.critical },
        { name: 'Stock-out', value: report.data.stockByStatus.stockout },
      ]
    : [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description={
          report.data
            ? `Stock and alert summary — ${report.data.periodLabel}`
            : 'Stock and alert summary for your scope'
        }
      />

      {report.isLoading ? (
        <Skeleton className="h-40 w-full rounded-xl" />
      ) : report.data ? (
        <>
          <DashboardSection eyebrow="Summary" title="Key figures">
            <KpiGrid columns={4}>
              <StatTile label="Facilities" value={report.data.totalFacilities} />
              <StatTile
                label="Active alerts"
                value={report.data.activeAlerts}
                variant="low"
                emphasize={report.data.activeAlerts > 0}
              />
              <StatTile
                label="Stock-outs"
                value={report.data.stockouts}
                variant="critical"
                emphasize={report.data.stockouts > 0}
              />
              <StatTile label="Resolved alerts" value={report.data.resolvedAlerts} />
            </KpiGrid>
          </DashboardSection>

          <DashboardSection eyebrow="Analysis" title="Stock by status">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Drug stock distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stockChartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/60" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </DashboardSection>
        </>
      ) : null}
    </div>
  );
}
