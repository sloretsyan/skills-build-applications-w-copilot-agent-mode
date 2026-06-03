import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-4">
      <h1>OctoFit Tracker</h1>
      <p className="lead">A modern React + Vite frontend for tracking workouts, teams, and progress.</p>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
