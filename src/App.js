import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import Checklist from "./pages/Checklist";
import ChecklistItem from "./pages/ChecklistItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          exact
          path="/checklist"
          element={
            <Layout>
              <Checklist />
            </Layout>
          }
        />
        <Route
          exact
          path="/checklist/:id"
          element={
            <Layout>
              <ChecklistItem />
            </Layout>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
