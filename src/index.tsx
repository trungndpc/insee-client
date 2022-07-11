import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import Register from './Register';
import PostPage from './PostPage';
import StockFormPage from './form/StockFormPage';
import GiftPage from './GiftPage';
import GreetingFriendFormPage from './form/GreetingFriendFormPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/qua-tang/:id" element={<GiftPage />} />
        <Route path="/bai-viet/:id" element={<PostPage />} />
        <Route path="/gioi-thieu-chuong-trinh-moi" element={<PostPage />} />
        <Route path="/khuyen-mai/stock-promotion/:promotionId/dang-ky" element={<StockFormPage />} />
        <Route path="/khuyen-mai/chao-ban-moi/:promotionId/dang-ky" element={<GreetingFriendFormPage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
