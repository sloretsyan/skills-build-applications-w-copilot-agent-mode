import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

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

function Teams() {
  const [teams, setTeams] = useState([]);
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
        setTeams(getItems(payload));
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <h1>Teams</h1>
        <span className="badge text-bg-primary">{teams.length}</span>
      </div>
      {status === 'loading' && <p className="text-secondary">Loading teams...</p>}
      {status === 'error' && <p className="text-danger">Unable to load teams.</p>}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.name}>
            <article className="card h-100 data-card">
              <div className="card-body">
                <h2 className="h5 card-title">{team.name}</h2>
                <p className="card-text text-secondary">{team.description}</p>
                <div className="d-flex flex-wrap gap-2">
                  {(team.members || []).map((member) => (
                    <span className="badge text-bg-light" key={member}>{member}</span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;