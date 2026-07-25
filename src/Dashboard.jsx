import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Marksheet Analysis',
    description: 'Analyze student marksheets across years with AI-driven insights.',
    icon: '📊',
    path: '/marksheet-analysis',
  },
  {
    title: 'Resume Analysis',
    description: 'Evaluate resumes and compare skills with job requirements.',
    icon: '📄',
    path: '#',
    disabled: true,
  },
  {
    title: 'Document Analysis',
    description: 'Extract meaning from documents with AI-assisted summarization.',
    icon: '🧾',
    path: '#',
    disabled: true,
  },
  {
    title: 'Image Analysis',
    description: 'Upload images and get AI insights for document scans and visuals.',
    icon: '🖼️',
    path: '#',
    disabled: true,
  },
];

const Dashboard = ({ userEmail, onLogout }) => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-hero glass-panel">
        <div>
          <span className="eyebrow">Welcome back</span>
          <h1>AI Workspace</h1>
          <p>Explore your student analytics tools in one modern dashboard.</p>
        </div>
        <div className="dashboard-meta">
          <span>{userEmail || 'User'}</span>
          <button className="button button-secondary" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <section className="service-grid">
        {services.map((service) => (
          <article key={service.title} className={`service-card ${service.disabled ? 'disabled' : ''}`}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link to={service.path} className="button button-outline" aria-disabled={service.disabled}>
              {service.disabled ? 'Coming Soon' : 'Open'}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
