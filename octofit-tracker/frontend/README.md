# OctoFit Tracker Frontend

Create `octofit-tracker/frontend/.env.local` before running the Vite app in Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, the React app calls the backend at `https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/`. When it is unset, the app falls back to `http://localhost:8000/api/`.