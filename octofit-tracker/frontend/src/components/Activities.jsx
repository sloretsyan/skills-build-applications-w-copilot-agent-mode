import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

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

function Activities() {
  const [activities, setActivities] = useState([]);
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
        setActivities(getItems(payload));
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <h1>Activities</h1>
        <span className="badge text-bg-primary">{activities.length}</span>
      </div>
      {status === 'loading' && <p className="text-secondary">Loading activities...</p>}
      {status === 'error' && <p className="text-danger">Unable to load activities.</p>}
      <div className="table-responsive data-table-wrap">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Minutes</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || `${activity.user}-${activity.date}`}>
                <td>{activity.user}</td>
                <td>{activity.activityType}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Activities;