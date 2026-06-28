# Resume Analysis UI

A beautiful, modern React UI for displaying resume analysis results from an API endpoint. Shows match score, missing skills, improvement suggestions, and interview preparation tips.

## Features

✨ **Key Features:**
- � Resume File Upload (PDF, DOC, DOCX, TXT)
- 📋 Job Description File Upload (PDF, DOC, DOCX, TXT)
- �📊 Match Score Display with progress bar
- ⚠️ Missing Skills Section
- 💡 Improvement Suggestions Section
- 🎯 Interview Preparation Tips Section
- 📱 Fully Responsive Design
- 🎨 Modern, Professional UI
- ✅ Sample Data for Testing

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file** (optional, for custom API endpoint):
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update `REACT_APP_API_ENDPOINT` with your API endpoint:
   ```
   REACT_APP_API_ENDPOINT=http://your-api-endpoint/api/analyze-resume
   ```

## Running the Project

### Development Mode
```bash
npm start
```
This will start the development server at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── App.jsx                    # Main app component with API integration
├── App.css                    # App styling
├── ResumeAnalysis.jsx         # Component that displays analysis results
├── ResumeAnalysis.css         # Component styling
├── index.js                   # React entry point
└── index.css                  # Global styles

public/
└── index.html                 # HTML template
```

## API Integration

### Expected Request Format

The app sends POST requests with **FormData** containing:
- **file**: The resume file (supported formats: PDF, DOC, DOCX, TXT)
- **job_description**: The job description file (supported formats: PDF, DOC, DOCX, TXT)

### Expected API Response Format

The component expects the following JSON structure from your API:

```json
{
  "groq_response": {
    "match_score": 85,
    "missing_skills": [
      "Skill 1",
      "Skill 2"
    ],
    "improvement_suggestions": [
      "Suggestion 1",
      "Suggestion 2"
    ],
    "interview_preparation_tips": [
      "Tip 1",
      "Tip 2"
    ]
  }
}
```

### Example Backend Implementation (Python Flask)

```python
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/api/analyze-resume', methods=['POST'])
def analyze_resume():
    # Get files from request
    resume_file = request.files.get('file')
    job_description_file = request.files.get('job_description')
    
    # Process resume file (extract text, etc.)
    resume_text = process_resume(resume_file)
    
    # Process job description file
    job_description_text = process_file(job_description_file)
    
    # Analyze using your analysis logic
    analysis = perform_analysis(resume_text, job_description_text)
    
    return jsonify(analysis)
```

### Customizing the API Endpoint

The default API endpoint is `http://localhost:5000/api/analyze-resume`. You can change it by:

**Option 1: Environment Variable**
- Edit `.env` file and set `REACT_APP_API_ENDPOINT`

**Option 2: Direct Modification**
- Edit `src/App.jsx` and change the `apiEndpoint` variable in the `fetchResumeAnalysis` function

## Features Explained

### 1. Match Score
- Displays a percentage score with a circular indicator
- Includes a progress bar visualization
- Color-coded with gradient background

### 2. Missing Skills
- Lists skills that are not present in the resume
- Each item is presented in a clean card format
- Icon-based presentation for easy scanning

### 3. Improvement Suggestions
- Provides actionable suggestions for resume improvement
- Organized in a list format
- Hover effects for better interactivity

### 4. Interview Preparation Tips
- Specific tips for preparing for interviews
- Clean, readable format
- Icons for visual distinction

## Customization

### Changing Colors
Edit the gradient colors in:
- `src/index.css` - Global background gradient
- `src/ResumeAnalysis.css` - Card colors and accents
- `src/App.css` - Loading and error colors

### Modifying Card Colors
In `ResumeAnalysis.css`:
```css
.match-score-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Responsive Breakpoints
- Large screens: Full layout
- Tablets (max-width: 768px): Adjusted spacing and font sizes
- Mobile (max-width: 480px): Compact layout

## Error Handling

- If the API fails, sample data is displayed for testing
- Error messages are shown to the user
- Loading state is displayed while fetching data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- CSS animations for smooth transitions
- Responsive images and scalable fonts
- Optimized re-renders with React hooks
- Production-ready build configuration

## Troubleshooting

### Port 3000 already in use
```bash
PORT=3001 npm start
```

### API Connection Issues
- Check that your API endpoint is correct in `.env`
- Ensure CORS is configured properly on your API
- Check browser console for detailed error messages

### Dependencies not installing
```bash
npm install --legacy-peer-deps
```

## License

MIT

## Support

For issues or questions, please refer to the sample data format and ensure your API response matches the expected structure.
