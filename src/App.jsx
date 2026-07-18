import React, { useState } from 'react';
import './App.css';
import MarksheetAnalysis from './MarksheetAnalysis';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [marksheetFiles, setMarksheetFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const fetchMarksheetAnalysis = async (files) => {
    try {
      setLoading(true);
      setError(null);
      
      // Resolve endpoint from runtime override, build env, or fallback
      const apiEndpoint = (typeof window !== 'undefined' && window._env_ && window._env_.REACT_APP_API_ENDPOINT)
        || process.env.REACT_APP_API_ENDPOINT
        || 'http://18.234.170.77:3000/analyze_marksheet';
      
      // Create FormData to send multiple files
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      setData(result);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
      setSampleData();
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const setSampleData = () => {
    const sampleData = {
      groq_response: {
        student_information: {
          name: "SUDIP DHAR",
          roll_number: "B07661G",
          institution: "SINDRANI SABITRI HIGH SCHOOL",
          program: "MADHYAMIK PARIKSHA (SECONDARY EXAMINATION)"
        },
        academic_summary: {
          total_marksheets: 2,
          overall_trend: "Improving",
          consistency_score: 70,
          overall_growth_percentage: 10
        },
        year_wise_analysis: [
          {
            year: "2009",
            percentage: 75,
            cgpa: 7.5,
            remarks: "Good performance"
          },
          {
            year: "2023",
            percentage: 80,
            cgpa: 8,
            remarks: "Excellent performance"
          }
        ],
        subject_analysis: [
          {
            subject_name: "FIRST LANGUAGE",
            scores: [
              { year: "2009", marks: 69 },
              { year: "2023", marks: 56 }
            ],
            trend: "Stable",
            growth_percentage: 0,
            recommendation: "Need to focus on language skills"
          },
          {
            subject_name: "MATHEMATICS",
            scores: [
              { year: "2009", marks: 82 },
              { year: "2023", marks: 41 }
            ],
            trend: "Declining",
            growth_percentage: -50,
            recommendation: "Need to work on mathematics skills"
          }
        ],
        strengths: [
          "MATHEMATICS (2009)",
          "PHYSICAL SCIENCE (2023)"
        ],
        improvement_required: [
          {
            subject: "MATHEMATICS",
            reason: "Declining trend",
            recommended_actions: [
              "Practice mathematics problems regularly",
              "Seek help from teacher or tutor"
            ]
          }
        ],
        future_scope: {
          recommended_streams: ["Science", "Arts"],
          recommended_careers: ["Engineering", "Teaching"],
          recommended_skills: ["Communication", "Problem-solving"],
          higher_studies_suggestions: [
            "Pursue higher education in mathematics or science",
            "Consider taking online courses or certifications"
          ]
        },
        risk_assessment: {
          risk_level: "Medium",
          observations: [
            "Declining trend in mathematics",
            "Need to focus on language skills"
          ]
        },
        final_remark: {
          summary: "The student has shown a mixed performance across the years. While there are areas of strength, there are also areas that require improvement.",
          overall_grade: "B+",
          mentor_suggestions: [
            "Focus on mathematics skills",
            "Practice language skills regularly"
          ]
        }
      }
    };
    setData(sampleData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (marksheetFiles.length === 0) {
      setError('Please select at least one marksheet');
      return;
    }
    
    fetchMarksheetAnalysis(marksheetFiles);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    // Append new files to existing files
    setMarksheetFiles(prevFiles => [...prevFiles, ...newFiles]);
    // Reset the file input so you can select the same file again if needed
    e.target.value = '';
  };

  const removeFile = (index) => {
    setMarksheetFiles(marksheetFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      {!submitted ? (
        <div className="upload-container">
          <div className="upload-card">
            <h1>📊 Multi-Year Marksheet Analysis</h1>
            <p className="subtitle">Upload multiple marksheets to get comparative year-wise analysis and insights</p>
            
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="marksheet-files" className="form-label">🖼️ Upload Marksheet Images</label>
                <input
                  id="marksheet-files"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="file-input"
                  multiple
                />
                
                {marksheetFiles.length > 0 && (
                  <div className="files-list">
                    <p className="files-count">📎 {marksheetFiles.length} file(s) selected:</p>
                    <ul className="file-items">
                      {marksheetFiles.map((file, index) => (
                        <li key={index} className="file-item">
                          <span className="file-item-name">✓ {file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="remove-file-btn"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading || marksheetFiles.length === 0}
              >
                {loading ? 'Analyzing...' : 'Analyze Marksheets'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Analyzing your marksheets...</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <p>⚠️ {error}</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Showing sample data for demonstration</p>
            </div>
          )}
          
          {data && !loading && (
            <>
              <MarksheetAnalysis data={data} />
              <div className="reset-container">
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setData(null);
                    setMarksheetFiles([]);
                    setError(null);
                  }}
                  className="reset-button"
                >
                  ← Analyze Other Marksheets
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
