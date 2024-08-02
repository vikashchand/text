import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TextEditor from './Components/TextEditor';
import GenerateUrl from './Components/GenerateUrls';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GenerateUrl/> } />
      <Route path="/:urlId" element={ <TextEditor/> } />
    </Routes>
  </Router>
);

export default App;
