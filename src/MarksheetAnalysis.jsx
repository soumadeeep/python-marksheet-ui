import React from 'react';
import './MarksheetAnalysis.css';

const MarksheetAnalysis = ({ data }) => {
  if (!data || !data.groq_response) {
    return <div className="error-message">No data available</div>;
  }

  const groqData = data.groq_response;
  const {
    student_information,
    academic_summary,
    year_wise_analysis,
    subject_analysis,
    strengths,
    improvement_required,
    future_scope,
    risk_assessment,
    final_remark
  } = groqData;

  const getRiskColor = (riskLevel) => {
    const level = riskLevel?.toUpperCase();
    if (level === 'HIGH') return '#e74c3c';
    if (level === 'MEDIUM') return '#f39c12';
    return '#2ecc71';
  };

  const getTrendIcon = (trend) => {
    const t = trend?.toLowerCase();
    if (t?.includes('improving') || t?.includes('increasing')) return '📈';
    if (t?.includes('declining') || t?.includes('decreasing')) return '📉';
    return '➡️';
  };

  return (
    <div className="marksheet-analysis-container">
      {/* Header */}
      <div className="report-header">
        <h1>📊 Comprehensive Student Performance Report</h1>
        <p className="report-subtitle">Multi-Year Academic Analysis & Insights</p>
      </div>

      {/* Student Information Card */}
      <div className="card student-info-card">
        <h2 className="section-title">👤 Student Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Student Name</span>
            <span className="info-value">{student_information.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Roll Number</span>
            <span className="info-value">{student_information.roll_number}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Institution</span>
            <span className="info-value">{student_information.institution}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Program</span>
            <span className="info-value">{student_information.program}</span>
          </div>
        </div>
      </div>

      {/* Academic Summary Card */}
      <div className="card summary-card">
        <h2 className="section-title">📈 Academic Summary</h2>
        <div className="summary-overview">
          <div className="overview-item">
            <span className="overview-label">Total Marksheets Analyzed</span>
            <span className="overview-value">{academic_summary.total_marksheets}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Overall Trend</span>
            <span className="overview-value trend">
              {getTrendIcon(academic_summary.overall_trend)} {academic_summary.overall_trend}
            </span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Consistency Score</span>
            <span className="overview-value">{academic_summary.consistency_score}%</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Overall Growth</span>
            <span className="overview-value growth">{academic_summary.overall_growth_percentage > 0 ? '+' : ''}{academic_summary.overall_growth_percentage}%</span>
          </div>
        </div>
      </div>

      {/* Year-wise Analysis Card */}
      <div className="card year-wise-card">
        <h2 className="section-title">📅 Year-wise Performance</h2>
        <div className="years-grid">
          {year_wise_analysis.map((yearData, index) => (
            <div key={index} className="year-card">
              <div className="year-header">
                <h3 className="year-label">Year {yearData.year}</h3>
              </div>
              <div className="year-metrics">
                <div className="metric">
                  <span className="metric-label">Percentage</span>
                  <span className="metric-value">{yearData.percentage}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">CGPA</span>
                  <span className="metric-value">{yearData.cgpa}</span>
                </div>
              </div>
              <div className="year-remarks">
                <p className="remarks-text">💬 {yearData.remarks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Analysis Card */}
      <div className="card subject-analysis-card">
        <h2 className="section-title">📚 Subject-wise Trend Analysis</h2>
        <div className="subjects-container">
          {subject_analysis.map((subject, index) => (
            <div key={index} className="subject-analysis-item">
              <div className="subject-header">
                <h3 className="subject-name">{subject.subject_name || 'Unknown Subject'}</h3>
                <span className={`trend-badge ${subject.trend ? subject.trend.toLowerCase() : 'stable'}`}>
                  {getTrendIcon(subject.trend)} {subject.trend || 'Stable'}
                </span>
              </div>
              
              <div className="scores-timeline">
                {subject.scores.map((score, scoreIndex) => (
                  <div key={scoreIndex} className="score-point">
                    <span className="score-year">{score.year}</span>
                    <span className="score-marks">{score.marks} marks</span>
                  </div>
                ))}
              </div>

              <div className="subject-metrics">
                <div className="metric-item">
                  <span className="metric-label">Growth</span>
                  <span className={`metric-value ${subject.growth_percentage > 0 ? 'positive' : subject.growth_percentage < 0 ? 'negative' : 'neutral'}`}>
                    {subject.growth_percentage > 0 ? '+' : ''}{subject.growth_percentage}%
                  </span>
                </div>
              </div>

              <div className="subject-recommendation">
                <p className="recommendation-text">💡 {subject.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths Card */}
      <div className="card strengths-card">
        <h2 className="section-title">⭐ Key Strengths</h2>
        <div className="strengths-list">
          {strengths.map((strength, index) => (
            <div key={index} className="strength-item">
              <span className="strength-icon">✨</span>
              <span className="strength-text">{strength}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Required Card */}
      <div className="card improvement-card">
        <h2 className="section-title">📍 Areas Requiring Improvement</h2>
        {improvement_required.map((item, index) => (
          <div key={index} className="improvement-item">
            <div className="improvement-header">
              <h3 className="improvement-subject">{item.subject}</h3>
              <span className="improvement-reason">Reason: {item.reason}</span>
            </div>
            <div className="improvement-actions">
              <p className="actions-label">Recommended Actions:</p>
              <ul className="actions-list">
                {item.recommended_actions.map((action, actionIndex) => (
                  <li key={actionIndex} className="action-item">
                    <span className="action-icon">→</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Assessment Card */}
      <div className="card risk-card">
        <h2 className="section-title">⚠️ Risk Assessment</h2>
        <div className="risk-content">
          <div className="risk-level-badge" style={{ backgroundColor: getRiskColor(risk_assessment.risk_level) }}>
            {risk_assessment.risk_level} Risk
          </div>
          <div className="risk-observations">
            <h3 className="observations-title">Observations:</h3>
            <ul className="observations-list">
              {risk_assessment.observations.map((observation, index) => (
                <li key={index} className="observation-item">
                  <span className="obs-icon">•</span>
                  <span>{observation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Future Scope Card */}
      <div className="card future-scope-card">
        <h2 className="section-title">🚀 Future Scope & Recommendations</h2>
        
        <div className="future-sections">
          <div className="future-section">
            <h3 className="future-subsection-title">🎯 Recommended Streams</h3>
            <div className="future-items">
              {future_scope.recommended_streams.map((stream, index) => (
                <span key={index} className="future-badge stream-badge">{stream}</span>
              ))}
            </div>
          </div>

          <div className="future-section">
            <h3 className="future-subsection-title">💼 Recommended Careers</h3>
            <div className="future-items">
              {future_scope.recommended_careers.map((career, index) => (
                <span key={index} className="future-badge career-badge">{career}</span>
              ))}
            </div>
          </div>

          <div className="future-section">
            <h3 className="future-subsection-title">🛠️ Skills to Develop</h3>
            <div className="future-items">
              {future_scope.recommended_skills.map((skill, index) => (
                <span key={index} className="future-badge skill-badge">{skill}</span>
              ))}
            </div>
          </div>

          <div className="future-section">
            <h3 className="future-subsection-title">📖 Higher Studies Suggestions</h3>
            <ul className="suggestions-list">
              {future_scope.higher_studies_suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  <span className="suggestion-icon">→</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Final Remark Card */}
      <div className="card final-remark-card">
        <h2 className="section-title">📋 Final Remarks & Mentor Suggestions</h2>
        
        <div className="final-remark-content">
          <div className="overall-grade-section">
            <span className="grade-label">Overall Grade</span>
            <span className="grade-value">{final_remark.overall_grade}</span>
          </div>

          <div className="summary-section">
            <h3 className="summary-title">Summary</h3>
            <p className="summary-text">{final_remark.summary}</p>
          </div>

          <div className="mentor-section">
            <h3 className="mentor-title">Mentor Suggestions</h3>
            <ul className="mentor-list">
              {final_remark.mentor_suggestions.map((suggestion, index) => (
                <li key={index} className="mentor-item">
                  <span className="mentor-icon">👨‍🏫</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="report-footer">
        <p>This comprehensive report has been generated based on your uploaded marksheets analysis.</p>
        <p className="footer-date">Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default MarksheetAnalysis;
