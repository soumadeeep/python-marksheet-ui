# Resume Analysis UI - Project Instructions

This is a React application for uploading resume files and job descriptions to get personalized resume analysis.

## Project Overview

The application:
- Accepts resume file uploads (PDF, DOC, DOCX, TXT)
- Accepts job description input
- Sends both to an API endpoint for analysis
- Displays results including:
  - Match score with progress indicator
  - Missing skills required for the position
  - Improvement suggestions for resume enhancement
  - Interview preparation tips

## Technology Stack

- React 18.2.0
- React DOM 18.2.0
- React Scripts 5.0.1
- CSS3 for styling and animations
- FormData API for file uploads

## Setup Instructions

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure your API endpoint
3. Start development server: `npm start`
4. Build for production: `npm run build`

## Key Files

- `src/App.jsx` - Main component with file upload form and API integration
- `src/ResumeAnalysis.jsx` - Component displaying analysis results
- `src/ResumeAnalysis.css` - Component-specific styling
- `public/index.html` - HTML template

## API Integration

### Request Format
The app sends FormData with:
- **file**: Resume file (PDF, DOC, DOCX, TXT)
- **job_description**: Job description file (PDF, DOC, DOCX, TXT)

### Response Format
```json
{
  "groq_response": {
    "match_score": <number>,
    "missing_skills": [<strings>],
    "improvement_suggestions": [<strings>],
    "interview_preparation_tips": [<strings>]
  }
}
```

## Features

- Beautiful upload form with drag-and-drop support
- File type validation (PDF, DOC, DOCX, TXT)
- Resume and job description input
- Beautiful gradient design with animations
- Responsive layout for all screen sizes
- Loading and error states
- Sample data for testing
- "Analyze Another Resume" button for multiple analyses
- Smooth transitions and hover effects
- Professional card-based UI

## Customization

- Colors can be modified in CSS files
- API endpoint configured via `.env` file
- Component structure allows easy modifications
- File type acceptance can be modified in App.jsx
