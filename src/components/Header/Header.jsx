import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation(); // Hook para obter a URL atual

  return (
    <div className={styles.menu_container}>
      <div className={styles.left_menu}>
        <img src="/logo.jpg" alt="site logo" />
        <span
          className={`${styles.menu_button} ${
            location.pathname === "/" ? styles.selected : ""
          }`}
        >
          Início
        </span>
        <span className={styles.menu_button}>Personalizar</span>
        <span className={styles.menu_button}>Categorias</span>
      </div>
      <div className={styles.right_menu}>
        <span className={styles.menu_button}>Gerenciar</span>
        <span className={styles.menu_button}>Meu Perfil</span>
        <span className={styles.menu_button}>Carrinho (2)</span>
      </div>
    </div>
  );
};

export default Header;
