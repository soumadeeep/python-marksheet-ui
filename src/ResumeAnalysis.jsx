import React from 'react';
import './ResumeAnalysis.css';

const ResumeAnalysis = ({ data }) => {
  if (!data || !data.groq_response) {
    return <div className="error-message">No data available</div>;
  }

  const { match_score, verdict, missing_skills, improvement_suggestions, interview_preparation_tips } = data.groq_response;

  return (
    <div className="resume-analysis-container">
      <div className="header">
        <h1>📊 Resume Analysis Report</h1>
      </div>

      {/* Match Score Card */}
      <div className="card match-score-card">
        <div className="score-container">
          <div className="score-circle">
            <span className="score-percentage">{match_score}%</span>
            <span className="score-label">Match Score</span>
          </div>
          <div className="score-info">
            <h3 className="verdict-title">📋 Recommendation</h3>
            <p className="verdict-text">{verdict || "Your resume aligns well with the job requirements."}</p>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${match_score}%` }}></div>
          </div>
        </div>
      </div>

      {/* Missing Skills Card */}
      <div className="card missing-skills-card">
        <h2 className="section-title">⚠️ Missing Skills</h2>
        <ul className="skills-list">
          {missing_skills && missing_skills.map((skill, index) => (
            <li key={index} className="skill-item">
              <span className="skill-icon">❌</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improvement Suggestions Card */}
      <div className="card improvement-card">
        <h2 className="section-title">💡 Improvement Suggestions</h2>
        <ul className="suggestions-list">
          {improvement_suggestions && improvement_suggestions.map((suggestion, index) => (
            <li key={index} className="suggestion-item">
              <span className="suggestion-icon">✨</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Interview Preparation Tips Card */}
      <div className="card interview-card">
        <h2 className="section-title">🎯 Interview Preparation Tips</h2>
        <ul className="tips-list">
          {interview_preparation_tips && interview_preparation_tips.map((tip, index) => (
            <li key={index} className="tip-item">
              <span className="tip-icon">📝</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
