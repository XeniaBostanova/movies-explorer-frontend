import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  const history = useHistory();

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button type="button" className="not-found__link" onClick={() => history.goBack()}>Назад</button>
    </section>
  )
}

export default NotFoundPage;