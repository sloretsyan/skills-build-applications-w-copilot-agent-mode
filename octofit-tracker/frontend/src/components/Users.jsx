import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

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

function Users() {
  const [users, setUsers] = useState([]);
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
        setUsers(getItems(payload));
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <h1>Users</h1>
        <span className="badge text-bg-primary">{users.length}</span>
      </div>
      {status === 'loading' && <p className="text-secondary">Loading users...</p>}
      {status === 'error' && <p className="text-danger">Unable to load users.</p>}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id || user.username || user.email}>
            <article className="card h-100 data-card">
              <div className="card-body">
                <h2 className="h5 card-title">{user.firstName} {user.lastName}</h2>
                <p className="mb-1 text-secondary">@{user.username}</p>
                <p className="mb-1">{user.email}</p>
                <span className="badge text-bg-light">{user.team || 'Independent'}</span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;