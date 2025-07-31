import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { GitHubProvider } from './contexts/GitHubContext';
import HomePage from './pages/HomePage';
import IssuesPage from './pages/IssuesPage';
import IssueDetailPage from './pages/IssueDetailPage';

function App() {
  return (
    <GitHubProvider>
      <div className="App">
        <header className="App-header">
          <h1>GitHub Issue Dashboard</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/issues/:owner/:repo" element={<IssuesPage />} />
            <Route path="/issues/:owner/:repo/:issueNumber" element={<IssueDetailPage />} />
            <Route path="*" element={<div>404 - 页面不存在</div>} />
          </Routes>
        </main>
      </div>
    </GitHubProvider>
  );
}

export default App;
