import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obter a URL atual

  return (
    <div className={styles.main_container}>
      <Header />
      {location.pathname === "/" ? (
        <>
          <div className={styles.main_image}>
            <img src="/home_image.jpg" alt="home image" />
          </div>
          <div className={styles.title_container}>
            <span>DeLetraFC</span>
            <p>Personalize o uniforme do seu time do seu jeito!</p>
          </div>
        </>
      ) : (
        <div className={styles.outlet_container}>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Home;
