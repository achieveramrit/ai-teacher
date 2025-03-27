import React from 'react';
import App from './App';
import './styles.css';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Get the root element from your HTML
const container = document.getElementById('root');
const root = createRoot(container);

// Function to handle uncaught errors
const handleError = (error, errorInfo) => {
  console.error('Application error:', error, errorInfo);
  // In a real app, you would send this to an error tracking service
};

// Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    handleError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong with the teaching assistant.</h2>
          <button 
            onClick={() => window.location.reload()}
            className="reload-button"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main render function with Error Boundary and Strict Mode
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Optional: Register service worker for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Add global error handlers
window.addEventListener('error', (event) => {
  handleError(event.error, {
    componentStack: event.error.stack || '',
  });
});

window.addEventListener('unhandledrejection', (event) => {
  handleError(event.reason, {
    componentStack: event.reason.stack || '',
  });
});