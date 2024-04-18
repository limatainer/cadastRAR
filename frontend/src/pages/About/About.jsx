import styles from './About.module.css';

import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
      <h3>Documentos de referencia</h3>
      <p>Descarregue o documento e faça uso do mesmo no caso que se aplicar.</p>
      <Link to="/posts/create" className="btn">
        Adicionar nova pessoa
      </Link>
    </div>
  );
};

export default About;
