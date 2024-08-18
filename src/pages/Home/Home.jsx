import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.main_container}>
      <Header />
      <div className={styles.main_image}>
        <img src="/home_image.jpg" alt="home image" />
      </div>
      <div className={styles.title_container}>
        <span>DeLetraFC</span>
        <p>Personalize o uniforme do seu time do seu jeito!</p>
      </div>
    </div>
  );
};

export default Home;
