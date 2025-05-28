import React from 'react';
import './App.css';
import './theme.css';
import MainContainer from './components/MainContainer';

// PUBLIC_INTERFACE
/**
 * App is the top-level shell for ResumeCraft AI.
 * Renders the navigation bar, and delegates main content to MainContainer.
 */
function App() {
  return (
    <div className="app">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            {/* Placeholder for global/top-level action button(s) */}
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>
      {/* Main content routed to MainContainer */}
      <main style={{ paddingTop: 80 }}>
        <MainContainer />
      </main>
    </div>
  );
}

export default App;