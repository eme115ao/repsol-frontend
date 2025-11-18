import { FaHome, FaCubes, FaUsers, FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function FooterNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <FaHome /> },
    { name: "Produtos", path: "/produtos", icon: <FaCubes /> },
    { name: "Equipa", path: "/equipa", icon: <FaUsers /> },
    { name: "Minha", path: "/minha", icon: <FaUserCircle /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-orange-300 z-50">
      <div className="flex justify-around py-2 text-sm text-gray-700">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 ${
                active ? "text-orange-500 font-semibold" : "text-gray-500"
              } hover:text-orange-500 transition`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}
