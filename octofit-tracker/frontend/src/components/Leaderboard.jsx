import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.results)) {
    return payload.results;
  }
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  return [];
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        setLeaderboard(getItems(payload));
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <h1>Leaderboard</h1>
        <span className="badge text-bg-primary">{leaderboard.length}</span>
      </div>
      {status === 'loading' && <p className="text-secondary">Loading leaderboard...</p>}
      {status === 'error' && <p className="text-danger">Unable to load leaderboard.</p>}
      <div className="list-group shadow-sm">
        {leaderboard.map((entry) => (
          <div className="list-group-item d-flex align-items-center justify-content-between" key={entry._id || entry.user}>
            <div>
              <strong>#{entry.rank} {entry.user}</strong>
              <div className="text-secondary small">{entry.team || 'Independent'}</div>
            </div>
            <span className="badge rounded-pill text-bg-success">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;