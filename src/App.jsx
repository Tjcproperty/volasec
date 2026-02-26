import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import PageLayout from "./layout/PageLayout";
import Home from "./pages/Home";
import ServicesIndex from "./pages/ServicesIndex";
import ServicePage from "./pages/ServicePage";
import TelescopePage from "./pages/TelescopePage";
import IndustriesIndex from "./pages/IndustriesIndex";
import IndustryPage from "./pages/IndustryPage";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import ContactPage from "./pages/Contact";
import ConfirmSubscription from "./components/ConfirmSubscription";
import SubscribersList from "./components/SubscribersList";
import BulkNewsletter from "./components/BulkNewsletter";
import Sidebar from "./layout/Sidebar";
import Login from "./pages/Login";

function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    const saved = localStorage.getItem("admin_authenticated");
    const expiry = localStorage.getItem("admin_authenticated_expiry");
    const now = new Date().getTime();

    if (saved === "true" && expiry && now < parseInt(expiry)) {
      return true;
    } else {
      localStorage.removeItem("admin_authenticated");
      localStorage.removeItem("admin_authenticated_expiry");
      return false;
    }
  });

  const handleLogin = () => {
    setAuthenticated(true);
    const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
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
          {/* Public routes with shared layout */}
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesIndex />} />
            <Route path="/services/telescope" element={<TelescopePage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/industries" element={<IndustriesIndex />} />
            <Route path="/industries/:slug" element={<IndustryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/confirm" element={<ConfirmSubscription />} />
          </Route>

          {/* Admin routes (unchanged) */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
