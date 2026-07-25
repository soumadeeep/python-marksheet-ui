import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="landing-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">AI Student Insights</span>
          <h1>Unlock learning intelligence from student marksheets.</h1>
          <p>
            Build trust with a modern AI platform that analyzes performance, reveals trends, and delivers actionable recommendations.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="button button-primary">Login</Link>
            <Link to="/signup" className="button button-secondary">Sign Up</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card gradient-card">MARKSHEET</div>
          <div className="stat-card stat-card-1">
            <span>+23%</span>
            <small>Accuracy lift</small>
          </div>
          <div className="stat-card stat-card-2">
            <span>5 AI tools</span>
            <small>Future-ready suite</small>
          </div>
        </div>
      </section>

      <section className="about-section glass-panel">
        <div>
          <h2>Who we are</h2>
          <p>
            We are a premium AI analytics platform for educators and institutions, designed to turn marksheet data into clear academic insights.
          </p>
        </div>
        <div>
          <h2>Why choose us</h2>
          <ul>
            <li>Fast marksheet intelligence with professional visual reports</li>
            <li>Designed for future AI service expansion</li>
            <li>Secure, clean, and easy onboarding flow</li>
          </ul>
        </div>
      </section>

      <section className="features-section">
        <h2>Platform Highlights</h2>
        <div className="features-grid">
          <article className="feature-card">
            <h3>Intelligent Insights</h3>
            <p>Automated performance summaries that focus on growth and improvement.</p>
          </article>
          <article className="feature-card">
            <h3>Clean Dashboard</h3>
            <p>One place to access all AI services with a premium SaaS user experience.</p>
          </article>
          <article className="feature-card">
            <h3>Secure Authentication</h3>
            <p>Sign up, log in, and get instant access to your workspace.</p>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-panel glass-panel">
          <h2>Ready to transform marksheet data?</h2>
          <Link to="/signup" className="button button-primary">Get Started</Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
