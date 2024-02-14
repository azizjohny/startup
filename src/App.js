import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent'; 
import Footer from './components/Footer';
import './App.css';

const App = () => {
  // State to track the expanded category in LeftSidebar
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content-container">
          {/* Pass the state and the state updater function as props to LeftSidebar */}
          <LeftSidebar
            expandedCategory={expandedCategory}
            setExpandedCategory={setExpandedCategory}
          />
          {/* Pass the state updater function as a prop to MainContent */}
          <MainContent
            setExpandedCategory={setExpandedCategory}
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
