import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
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
        setWorkouts(getItems(payload));
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <h1>Workouts</h1>
        <span className="badge text-bg-primary">{workouts.length}</span>
      </div>
      {status === 'loading' && <p className="text-secondary">Loading workouts...</p>}
      {status === 'error' && <p className="text-danger">Unable to load workouts.</p>}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6 col-xl-3" key={workout._id || workout.name}>
            <article className="card h-100 data-card">
              <div className="card-body">
                <h2 className="h5 card-title">{workout.name}</h2>
                <p className="mb-1">{workout.durationMinutes} minutes</p>
                <p className="mb-0 text-secondary">{workout.caloriesBurned} calories</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;