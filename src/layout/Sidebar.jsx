// components/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  return (
    <div className="w-64 h-screen bg-secondary border-r border-primary-20 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-dark mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/subscribers"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "text-dark hover:bg-primary/10"}`
            }
          >
            Subscribers
          </NavLink>
          <NavLink
            to="/bulk-newsletter"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "text-dark hover:bg-primary/10"}`
            }
          >
            Bulk Newsletter
          </NavLink>
        </nav>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
