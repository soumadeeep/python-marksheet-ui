import React from 'react';
import './MarksheetAnalysis.css';

const MarksheetAnalysis = ({ data }) => {
  if (!data || !data.groq_response) {
    return <div className="error-message">No data available</div>;
  }

  const { student_information, subjects, summary, analysis } = data.groq_response;

  const getPerformanceColor = (performance) => {
    const lower = performance.toLowerCase();
    if (lower.includes('outstanding') || lower.includes('excellent')) return '#2ecc71';
    if (lower.includes('very good')) return '#3498db';
    if (lower.includes('good')) return '#f39c12';
    if (lower.includes('average')) return '#e74c3c';
    return '#95a5a6';
  };

  const getGradeColor = (grade) => {
    if (!grade) return '#ecf0f1';
    const g = grade.toUpperCase();
    if (g.startsWith('A')) return '#2ecc71';
    if (g.startsWith('B')) return '#3498db';
    if (g.startsWith('C')) return '#f39c12';
    if (g.startsWith('D')) return '#e67e22';
    return '#e74c3c';
  };

  return (
    <div className="marksheet-analysis-container">
      {/* Header */}
      <div className="report-header">
        <h1>📄 Student Performance Report</h1>
        <p className="report-subtitle">Comprehensive Academic Analysis</p>
      </div>

      {/* Student Information Card */}
      <div className="card student-info-card">
        <h2 className="section-title">👤 Student Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Student Name</span>
            <span className="info-value">{student_information.student_name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Roll Number</span>
            <span className="info-value">{student_information.roll_number}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Registration Number</span>
            <span className="info-value">{student_information.registration_number}</span>
          </div>
          <div className="info-item">
            <span className="info-label">School/College</span>
            <span className="info-value">{student_information.school_name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Board</span>
            <span className="info-value">{student_information.board}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Examination</span>
            <span className="info-value">{student_information.examination}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Year</span>
            <span className="info-value">{student_information.year}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Result</span>
            <span className="info-value result-badge">{student_information.result}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Overall Grade</span>
            <span className="info-value grade-badge" style={{ backgroundColor: getGradeColor(student_information.overall_grade) }}>
              {student_information.overall_grade}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="card summary-card">
        <h2 className="section-title">📊 Academic Summary</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Subjects</span>
            <span className="summary-value">{summary.total_subjects}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Average Marks</span>
            <span className="summary-value">{summary.average_marks.toFixed(2)}</span>
          </div>
        </div>

        <div className="strengths-weaknesses">
          <div className="strength-section">
            <h3 className="subsection-title">✨ Strongest Subjects</h3>
            <div className="badges-container">
              {summary.strongest_subjects.map((subject, index) => (
                <span key={index} className="badge strength-badge">{subject}</span>
              ))}
            </div>
          </div>
          <div className="weakness-section">
            <h3 className="subsection-title">⚠️ Subjects Needing Improvement</h3>
            <div className="badges-container">
              {summary.weakest_subjects.map((subject, index) => (
                <span key={index} className="badge weakness-badge">{subject}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Marks Table */}
      <div className="card subjects-card">
        <h2 className="section-title">📚 Subject-wise Performance</h2>
        <div className="table-responsive">
          <table className="subjects-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Written Marks</th>
                <th>Oral Marks</th>
                <th>Total Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="subject-name">{subject.subject_name}</td>
                  <td>{subject.written_marks}</td>
                  <td>{subject.oral_marks}</td>
                  <td className="total-marks"><strong>{subject.total_marks}</strong></td>
                  <td>
                    <span 
                      className="grade-badge" 
                      style={{ backgroundColor: getGradeColor(subject.grade) }}
                    >
                      {subject.grade || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Analysis Card */}
      <div className="card analysis-card">
        <h2 className="section-title">📈 Performance Analysis</h2>
        
        <div className="performance-level">
          <span className="level-label">Performance Level</span>
          <span 
            className="level-badge" 
            style={{ backgroundColor: getPerformanceColor(analysis.performance_level) }}
          >
            {analysis.performance_level}
          </span>
        </div>

        <div className="analysis-sections">
          <div className="analysis-section">
            <h3 className="subsection-title">💪 Strengths</h3>
            <ul className="points-list">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="point-item">
                  <span className="point-icon">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="analysis-section">
            <h3 className="subsection-title">🎯 Areas for Improvement</h3>
            <ul className="points-list">
              {analysis.areas_for_improvement.map((area, index) => (
                <li key={index} className="point-item">
                  <span className="point-icon improvement-icon">→</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="analysis-section">
            <h3 className="subsection-title">📖 Study Recommendations</h3>
            <ul className="points-list">
              {analysis.study_recommendations.map((recommendation, index) => (
                <li key={index} className="point-item">
                  <span className="point-icon">💡</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="analysis-section">
            <h3 className="subsection-title">🚀 Career Suggestions</h3>
            <ul className="points-list">
              {analysis.career_suggestions.map((suggestion, index) => (
                <li key={index} className="point-item">
                  <span className="point-icon">⭐</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="report-footer">
        <p>This report is generated based on the uploaded marksheet analysis.</p>
        <p className="footer-date">Generated on: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MarksheetAnalysis;
