import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/dashboard')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Average Grade</h3>
          <p className="big-number">{stats.avg_grade}%</p>
          <p className={stats.trend === 'up' ? 'trend-up' : 'trend-down'}>
            {stats.trend === 'up' ? '↑' : '↓'} {stats.change}% from last week
          </p>
        </div>
        
        <div className="stat-card">
          <h3>Assignments Graded</h3>
          <p className="big-number">{stats.assignments_graded}</p>
          <p>This week</p>
        </div>
        
        <div className="stat-card">
          <h3>Student Questions</h3>
          <p className="big-number">{stats.questions_answered}</p>
          <p>24/7 AI support</p>
        </div>
      </div>
      
      <div className="chart-container">
        <h2>Performance Trends</h2>
        <div className="chart-placeholder">
          {/* In a real app, use Chart.js or similar here */}
          <p>Visualization of student performance over time would appear here</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;