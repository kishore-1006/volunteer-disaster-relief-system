import React from 'react';
import { Flame, Users, Home as HomeIcon, HeartHandshake, TrendingUp, Activity } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import StatCard from '../components/dashboard/StatCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivities from '../components/dashboard/RecentActivities';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

function Dashboard() {
  const { dashboardStats, dashboardLoading, dashboardError, shelters } = useApp();

  // ── Computed stats: prefer backend aggregated data, fall back to 0 ─────────
  const activeDisasters   = dashboardStats?.activeDisasters   ?? 0;
  const totalDisasters    = dashboardStats?.totalDisasters     ?? 0;
  const availableVolunteers = dashboardStats?.availableVolunteers ?? 0;
  const totalVolunteers   = dashboardStats?.totalVolunteers    ?? 0;
  const openShelters      = dashboardStats?.openShelters       ?? 0;
  const totalCapacity     = dashboardStats?.totalCapacity      ?? 0;
  const totalOccupancy    = dashboardStats?.totalOccupancy     ?? 0;
  const occupancyPercent  = dashboardStats?.occupancyPercent   ?? 0;
  const totalDonationAmount = dashboardStats?.totalDonationAmount ?? 0;
  const totalDonationsCount = dashboardStats?.totalDonationsCount ?? 0;

  // ── Donation breakdown chart ───────────────────────────────────────────────
  const donationTypeData = dashboardStats?.donationTypeBreakdown ?? {};
  const chartBars = Object.entries(donationTypeData).map(([type, count]) => {
    const colorMap = {
      MONEY: '#16a34a',
      MEDICAL_KITS: '#2563eb',
      FOOD_PACKS: '#d97706',
    };
    return {
      label: type.replace(/_/g, ' '),
      value: count,
      color: colorMap[type] || '#64748b',
    };
  });
  const maxChartValue = Math.max(...chartBars.map((b) => b.value), 1);

  // ── Task status breakdown ──────────────────────────────────────────────────
  const taskStatusCounts = dashboardStats?.taskStatusCounts ?? {};

  // ── Shelter rows for the per-shelter occupancy label row ──────────────────
  // Use raw shelters list from context for the individual-shelter labels at the bottom
  const shelterRows = shelters.slice(0, 4);

  return (
    <>
      <Navbar />
      <div className="page-layout">
        <Sidebar />
        <main className="page-content">
          {/* Page Header */}
          <div className="page-header d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <div>
              <h1 className="page-title">Control Dashboard</h1>
              <p className="page-subtitle">Real-time overview of all disaster relief operations</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              {dashboardLoading && (
                <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-3 py-2 d-flex align-items-center gap-1 small">
                  <span className="spinner-grow spinner-grow-sm text-warning" role="status" aria-hidden="true" style={{ width: '8px', height: '8px' }}></span>
                  Refreshing...
                </span>
              )}
              {!dashboardLoading && (
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 d-flex align-items-center gap-1 small">
                  <span className="spinner-grow spinner-grow-sm text-success" role="status" aria-hidden="true" style={{ width: '8px', height: '8px' }}></span>
                  System Online
                </span>
              )}
            </div>
          </div>

          {/* API Error Banner — shown without breaking layout */}
          {dashboardError && (
            <div className="alert alert-warning d-flex align-items-center gap-2 py-2 px-3 mb-3 small rounded-3" role="alert">
              <span>⚠️</span>
              <span>{dashboardError}</span>
            </div>
          )}

          {/* Stat Cards Row */}
          <div className="row g-4 mb-4 animate-fade-in">
            <div className="col-sm-6 col-xl-3">
              <StatCard
                title="Active Disasters"
                value={activeDisasters}
                icon={Flame}
                color="danger"
                change={`${totalDisasters} total`}
                changeType="negative"
                subtitle="Incidents requiring attention"
              />
            </div>
            <div className="col-sm-6 col-xl-3">
              <StatCard
                title="Volunteers Ready"
                value={availableVolunteers}
                icon={Users}
                color="primary"
                change={`${totalVolunteers} registered`}
                changeType="positive"
                subtitle="Available for deployment"
              />
            </div>
            <div className="col-sm-6 col-xl-3">
              <StatCard
                title="Open Shelters"
                value={openShelters}
                icon={HomeIcon}
                color="warning"
                change={`${occupancyPercent}% occupied`}
                changeType={occupancyPercent > 80 ? 'negative' : 'positive'}
                subtitle="Evacuation camps active"
              />
            </div>
            <div className="col-sm-6 col-xl-3">
              <StatCard
                title="Funds Raised"
                value={formatCurrency(totalDonationAmount)}
                icon={HeartHandshake}
                color="success"
                change={`${totalDonationsCount} donations`}
                changeType="positive"
                subtitle="Monetary contributions"
              />
            </div>
          </div>

          {/* Charts + Task Status Row */}
          <div className="row g-4 mb-4">
            {/* Donation Chart */}
            <div className="col-lg-7">
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h5 className="font-heading fw-bold text-dark mb-1">Donation Breakdown</h5>
                    <p className="text-muted small mb-0">Distribution by donation category</p>
                  </div>
                  <div className="accent-badge">
                    <TrendingUp size={14} /> Analytics
                  </div>
                </div>

                <div className="mini-chart-container" style={{ paddingBottom: '30px' }}>
                  {chartBars.length > 0 ? chartBars.map((bar, idx) => (
                    <div
                      key={idx}
                      className="chart-bar"
                      style={{
                        height: `${(bar.value / maxChartValue) * 100}%`,
                        backgroundColor: bar.color,
                        minHeight: '20px',
                      }}
                    >
                      <span className="chart-bar-value">{bar.value}</span>
                      <span className="chart-bar-label">{bar.label}</span>
                    </div>
                  )) : (
                    <div className="d-flex align-items-center justify-content-center h-100 text-muted small">
                      {dashboardLoading ? 'Loading...' : 'No donation data yet'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Task + Shelter Status */}
            <div className="col-lg-5">
              <div className="glass-card p-4 h-100">
                <h5 className="font-heading fw-bold text-dark mb-3">
                  <Activity size={18} className="me-2 text-primary" />
                  Operations Summary
                </h5>

                {/* Task Status */}
                <div className="mb-4">
                  <h6 className="text-muted small fw-bold text-uppercase mb-3" style={{ letterSpacing: '0.05em' }}>Relief Tasks</h6>
                  <div className="d-flex flex-column gap-2">
                    {[
                      { label: 'Completed',  key: 'COMPLETED',  color: 'bg-success' },
                      { label: 'In Progress', key: 'IN_PROGRESS', color: 'bg-primary' },
                      { label: 'Pending',    key: 'PENDING',    color: 'bg-warning' },
                    ].map((item) => (
                      <div key={item.key} className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <span className={`${item.color} rounded-circle d-inline-block`} style={{ width: '10px', height: '10px' }}></span>
                          <span className="small text-dark fw-medium">{item.label}</span>
                        </div>
                        <span className="fw-bold text-dark">{taskStatusCounts[item.key] ?? 0}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shelter Occupancy */}
                <div>
                  <h6 className="text-muted small fw-bold text-uppercase mb-3" style={{ letterSpacing: '0.05em' }}>Shelter Capacity</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="small text-muted">{totalOccupancy} / {totalCapacity} people</span>
                    <span className="small fw-bold text-dark">{occupancyPercent}%</span>
                  </div>
                  <div className="occupancy-bar">
                    <div
                      className="occupancy-fill"
                      style={{
                        width: `${occupancyPercent}%`,
                        background: occupancyPercent > 80
                          ? 'linear-gradient(90deg, #dc2626, #ef4444)'
                          : occupancyPercent > 50
                            ? 'linear-gradient(90deg, #d97706, #f59e0b)'
                            : 'linear-gradient(90deg, #16a34a, #22c55e)',
                      }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    {shelterRows.map((s) => (
                      <span key={s.id} className="small text-muted" style={{ fontSize: '0.7rem' }}>
                        {s.name.split(' ')[0]}: {s.currentOccupancy}/{s.capacity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions + Recent Activities */}
          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <QuickActions />
            </div>
            <div className="col-lg-6">
              <RecentActivities />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;