import React, { useState } from 'react';
import './App.css';
import MarksheetAnalysis from './MarksheetAnalysis';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [marksheetFile, setMarksheetFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fetchMarksheetAnalysis = async (file) => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint
      const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000/analyze_marksheet'; 
      
      // Create FormData to send file
      const formData = new FormData();
      formData.append('file', file);

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
          student_name: "SUDIP DHAR",
          roll_number: "B076616",
          registration_number: "0532",
          school_name: "SINDRANI SABITRI HIGH SCHOOL",
          board: "MADHYAMIK PARIKSHA",
          examination: "SECONDARY EXAMINATION",
          year: 2009,
          result: "PASS",
          overall_grade: "A+"
        },
        subjects: [
          {
            subject_name: "FIRST LANGUAGE - (1ST PAPER)",
            written_marks: 69,
            oral_marks: 20,
            total_marks: 89,
            grade: "B+"
          },
          {
            subject_name: "FIRST LANGUAGE - (2ND PAPER)",
            written_marks: 67,
            oral_marks: 0,
            total_marks: 67,
            grade: null
          },
          {
            subject_name: "SECOND LANGUAGE",
            written_marks: 45,
            oral_marks: 10,
            total_marks: 55,
            grade: "B"
          },
          {
            subject_name: "MATHEMATICS",
            written_marks: 72,
            oral_marks: 10,
            total_marks: 82,
            grade: "A+"
          }
        ],
        summary: {
          total_subjects: 4,
          average_marks: 73.25,
          strongest_subjects: ["MATHEMATICS", "FIRST LANGUAGE - (1ST PAPER)"],
          weakest_subjects: ["SECOND LANGUAGE"]
        },
        analysis: {
          performance_level: "OUTSTANDING",
          strengths: ["SCIENCE SUBJECTS", "MATHEMATICS"],
          areas_for_improvement: ["SECOND LANGUAGE"],
          study_recommendations: ["FOCUS ON LANGUAGE SUBJECTS", "PRACTICE MORE MATH PROBLEMS"],
          career_suggestions: ["SCIENCE RELATED FIELDS", "ENGINEERING", "RESEARCH"]
        }
      }
    };
    setData(sampleData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!marksheetFile) {
      setError('Please select a marksheet image');
      return;
    }
    
    fetchMarksheetAnalysis(marksheetFile);
  };

  return (
    <div className="App">
      {!submitted ? (
        <div className="upload-container">
          <div className="upload-card">
            <h1>� Marksheet Analysis</h1>
            <p className="subtitle">Upload your marksheet image to get detailed performance analysis</p>
            
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="marksheet-file" className="form-label">🖼️ Upload Marksheet Image</label>
                <input
                  id="marksheet-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                  onChange={(e) => setMarksheetFile(e.target.files[0])}
                  className="file-input"
                  required
                />
                {marksheetFile && <p className="file-name">✓ {marksheetFile.name}</p>}
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Analyze Marksheet'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Analyzing your marksheet...</p>
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
                    setMarksheetFile(null);
                    setError(null);
                  }}
                  className="reset-button"
                >
                  ← Analyze Another Marksheet
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
