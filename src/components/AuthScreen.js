import { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081';

const initialSignup = { username: '', email: '', password: '', security_string: '' };


export function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [login, setLogin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState(initialSignup);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (form, setForm, field, value) => {
    setForm({ ...form, [field]: value });
    setError('');
    setNotice('');
  };

  const readError = async (response) => {
    const body = await response.json().catch(() => ({}));
    if (typeof body.detail === 'string') return body.detail;
    if (typeof body.message === 'string') return body.message;
    return 'Something went wrong. Please try again.';
  };

  const submit = async (event) => {
    event.preventDefault();
    const isSignup = mode === 'signup';
    const payload = isSignup ? signup : login;

    setLoading(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/${isSignup ? 'signup' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(await readError(response));

      const data = await response.json().catch(() => ({}));
      if (isSignup) {
        setSignup(initialSignup);
        setMode('login');
        setNotice('Account created. Sign in to open your buildspace.');
        return;
      }

      // Keep only the server-issued session token, never credentials.
      if (data.access_token || data.token) {
        localStorage.setItem('flow-studio-auth-token', data.access_token || data.token);
      }
      onAuthenticated(data.user || { email: login.email, username: login.email.split('@')[0] });
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the authentication service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <WorkflowBackdrop />
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-card-heading">
          <span className="eyebrow">Flow Studio</span>
          <h1 id="auth-title">{mode === 'login' ? 'Welcome back' : 'Create your workspace'}</h1>
          <p>{mode === 'login' ? 'Sign in to continue building agent workflows.' : 'Start with a secure account for your workflows.'}</p>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Authentication options">
          <button className={mode === 'login' ? 'active' : ''} type="button" onClick={() => { setMode('login'); setError(''); }} role="tab" aria-selected={mode === 'login'}>Log in</button>
          <button className={mode === 'signup' ? 'active' : ''} type="button" onClick={() => { setMode('signup'); setError(''); }} role="tab" aria-selected={mode === 'signup'}>Sign up</button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {mode === 'signup' && (
            <label>
              Name
              <input required autoComplete="username" value={signup.username} onChange={(event) => updateField(signup, setSignup, 'username', event.target.value)} placeholder="Your name" />
            </label>
          )}
          <label>
            Email
            <input required type="email" autoComplete="email" value={mode === 'login' ? login.email : signup.email} onChange={(event) => mode === 'login' ? updateField(login, setLogin, 'email', event.target.value) : updateField(signup, setSignup, 'email', event.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input required type="password" minLength="8" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={mode === 'login' ? login.password : signup.password} onChange={(event) => mode === 'login' ? updateField(login, setLogin, 'password', event.target.value) : updateField(signup, setSignup, 'password', event.target.value)} placeholder="At least 8 characters" />
          </label>
          {mode === 'signup' && (
            <label>
              Security phrase
              <input required type="password" minLength="8" autoComplete="off" value={signup.security_string} onChange={(event) => updateField(signup, setSignup, 'security_string', event.target.value)} placeholder="Used to verify password recovery" />
              <small>Keep this private. It will be required when resetting your password.</small>
            </label>
          )}
          {error && <p className="auth-message error" role="alert">{error}</p>}
          {notice && <p className="auth-message success" role="status">{notice}</p>}
          <button className="auth-submit" type="submit" disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Open buildspace' : 'Create account'}</button>
        </form>
      </section>
    </main>
  );
}

function WorkflowBackdrop() {
  return (
    <div className="auth-workflow-backdrop" aria-hidden="true">
      <div className="backdrop-grid" />
      <svg className="backdrop-edges" viewBox="0 0 1200 720" preserveAspectRatio="none">
        <path d="M175 226 C 328 226, 315 366, 464 366 S 659 202, 778 202" />
        <path d="M490 394 C 638 394, 625 520, 794 520 S 939 395, 1050 395" />
        <path d="M175 522 C 302 522, 337 520, 480 520" />
      </svg>
      <div className="ghost-node ghost-input">Input<br /><span>Research topic</span></div>
      <div className="ghost-node ghost-agent">✦ Agent<br /><span>Find a concise answer</span></div>
      <div className="ghost-node ghost-condition">◇ Condition<br /><span>Needs review?</span></div>
      <div className="ghost-node ghost-review">✓ Human review<br /><span>Approval required</span></div>
      <div className="ghost-node ghost-output">Output<br /><span>Final response</span></div>
    </div>
  );
}
