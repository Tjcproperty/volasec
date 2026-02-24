import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import Contact from "./components/Contact";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SubscribersList from "./components/SubscribersList";
import ConfirmSubscription from "./components/ConfirmSubscription";
import BulkNewsletter from "./components/BulkNewsletter";
import Sidebar from "./layout/Sidebar";
import Login from "./pages/Login";

function App() {
  // ✅ Read localStorage immediately on init
  const [authenticated, setAuthenticated] = useState(() => {
    const saved = localStorage.getItem("admin_authenticated");
    const expiry = localStorage.getItem("admin_authenticated_expiry");
    const now = new Date().getTime();

    if (saved === "true" && expiry && now < parseInt(expiry)) {
      return true; // still valid
    } else {
      localStorage.removeItem("admin_authenticated");
      localStorage.removeItem("admin_authenticated_expiry");
      return false;
    }
  });

  const handleLogin = () => {
    setAuthenticated(true);
    const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days
    localStorage.setItem("admin_authenticated", "true");
    localStorage.setItem("admin_authenticated_expiry", expiry);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_authenticated_expiry");
  };

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/subscribers"
            element={
              authenticated ? (
                <div className="flex">
                  <Sidebar onLogout={handleLogout} />
                  <div className="flex-1 p-8">
                    <SubscribersList />
                  </div>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/bulk-newsletter"
            element={
              authenticated ? (
                <div className="flex">
                  <Sidebar onLogout={handleLogout} />
                  <div className="flex-1 p-8">
                    <BulkNewsletter />
                  </div>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/confirm"
            element={
              <>
                <Header />
                <ConfirmSubscription />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;