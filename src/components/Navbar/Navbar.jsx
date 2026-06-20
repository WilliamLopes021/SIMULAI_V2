import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/icons/simulai_logo_full.png";
import slugify from "slugify";
import styles from "./Navbar.module.css";
import { NavOptions } from "./NavOptions.jsx";
import { useUserData } from "../../hooks/useUserData.js";
import { FaBars } from "react-icons/fa";
import { userItems, adminItems } from "./navItems.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = auth && ["Boss", "Manager"].includes(auth.user.role);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.className.includes(`.${styles.hamburger}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const { userInfo } = useUserData(auth, isAdmin);

  const currentItems = isAdmin ? adminItems : userItems;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img
          src={logo}
          alt="Logo"
          className={styles.image}
          onClick={() => navigate("/")}
        />
      </div>

      {/* HAMBÚRGUER */}
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={27} />
      </button>

      {/* MENU + BOTÕES */}
      <div className={`${styles.menuContainer} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.headerMenu}>
          {currentItems.map((item, index) => {
            const path = item === "Home" ? "/" : `/${slugify(item)}`;
            const isActive = location.pathname === path;
            return (
              <li
                key={index}
                className={`${styles.headerMenuItem} ${
                  isActive ? styles.selected : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Link to={path} className={styles.linkReset}>
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.navButtons}>
          <NavOptions
            auth={auth}
            userInfo={userInfo}
            logout={logout}
            navigate={navigate}
          />
        </div>
      </div>
    </nav>
  );
}
