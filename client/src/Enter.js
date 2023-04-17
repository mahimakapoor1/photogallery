import React from "react";
import Fun from "./Fun";
import App from "./App";
import { Routes, Route } from "react-router-dom";

export default function Enter() {
  return (
    <Routes>
      <Route path="/" element={<Fun/>}></Route>
      <Route path="/app" element={<App/>}></Route>
    </Routes>
  );
}
