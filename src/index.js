import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EditFeedback from './forms/EditFeedback';
import AddFeedback from './forms/AddFeedback';
import Comments from './components/Comments';
import RoadMap from './pages/RoadMap';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
 
    <Routes>
      
        <Route path='/' element={<App />} />
        <Route  path='/comments/edit' element={<EditFeedback />} />
        <Route path='/add' element={<AddFeedback />} />
        <Route  path='/comments' element={<Comments />} />
        <Route path='/roadmap' element={<RoadMap />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


