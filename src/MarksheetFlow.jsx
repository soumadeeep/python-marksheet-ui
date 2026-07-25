import React, { useState } from 'react';
import MarksheetAnalysis from './MarksheetAnalysis';

const MarksheetFlow = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [marksheetFiles, setMarksheetFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const fetchMarksheetAnalysis = async (files) => {
    try {
      setLoading(true);
      setError(null);
      const apiEndpoint = 'http://marksheet-load-balancer-97479959.us-east-1.elb.amazonaws.com/analyze_marksheet';

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
    } finally {
      setLoading(false);
    }
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
    setMarksheetFiles((prevFiles) => [...prevFiles, ...newFiles]);
    e.target.value = '';
  };

  const removeFile = (index) => {
    setMarksheetFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="marksheet-flow-page">
      {!submitted ? (
        <div className="upload-container">
          <div className="upload-card">
            <div className="flow-header">
              <div>
                <span className="eyebrow">Marksheet Analysis</span>
                <h1>Upload marksheets for AI-powered student insights.</h1>
                <p>Submit one or more marksheets and get actionable academic analysis instantly.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="marksheet-files" className="form-label">Upload Marksheet Files</label>
                <input
                  id="marksheet-files"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="file-input"
                  multiple
                />
              </div>

              {marksheetFiles.length > 0 && (
                <div className="files-list">
                  <p className="files-count">{marksheetFiles.length} file(s) selected:</p>
                  <ul className="file-items">
                    {marksheetFiles.map((file, index) => (
                      <li key={index} className="file-item">
                        <span className="file-item-name">{file.name}</span>
                        <button type="button" onClick={() => removeFile(index)} className="remove-file-btn">✕</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="submit-button" disabled={loading || marksheetFiles.length === 0}>
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
                  ← Analyze other marksheets
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MarksheetFlow;
