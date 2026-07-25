import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    onLogin({ email });
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-panel glass-panel">
        <h1>Welcome back</h1>
        <p>Login to access the AI dashboard and marksheet tools.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </label>
          {error && <div className="auth-error">{error}</div>}
          <button className="button button-primary" type="submit">Login</button>
        </form>
        <p className="auth-footer">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
