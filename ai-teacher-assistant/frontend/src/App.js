import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Grading from './components/Grading';
import './styles.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app">
      <header className="app-header">
        <img src="assets/teacher-ai.png" alt="AI Teacher" className="logo" />
        <h1>AI Teach  Assistant</h1>
      </header>
      
      <nav className="tabs">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={activeTab === 'dashboard' ? 'active' : ''}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('grading')}
          className={activeTab === 'grading' ? 'active' : ''}
        >
          Grading
        </button>
        <button 
          onClick={() => setActiveTab('chatbot')}
          className={activeTab === 'chatbot' ? 'active' : ''}
        >
          Ask AI
        </button>
      </nav>
      
      <main className="content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'grading' && <Grading />}
        {activeTab === 'chatbot' && <Chatbot />}
      </main>
      
      <footer className="app-footer">
        <p>AI Teaching Assistant © 2023 | Hackathon Project</p>
      </footer>
    </div>
  );
}

export default App;