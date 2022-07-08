import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project" id="aboutProject">
      <h2 className="project__title">О проекте</h2>
      <div className="project__main-container">
        <div className="project__container">
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="project__description">Составление плана, работу над бэкендом, 
          вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__container">
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__description">У каждого этапа был мягкий и жёсткий дедлайн, 
          которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      
      <div className="project__duration-container">
        <p className="project__duration project__duration_type_backend">1 неделя</p>
        <p className="project__duration project__duration_type_frontend">4 недели</p>
      </div>
      <div className="project__task-container">
        <p className="project__task project__task_type_backend">Backend</p>
        <p className="project__task project__task_type_frontend">Frontend</p>
      </div>
    </section>
  )
}

export default AboutProject;
