import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument('posts');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
    }

    // create tags array
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!');
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate('/');
  };

  return (
    <div className={styles.create_post}>
      <h2>Novo perfil para adicionar</h2>
      <p>Adicione aqui os dados da pessoa.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="text"
            required
            placeholder="Escreva o nome da pessoa..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da foto:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma foto da pessoa"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Detalhes:</span>
          <textarea
            name="body"
            required
            placeholder="Faça uma descrição do perfil da pessoa"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Adicionar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
