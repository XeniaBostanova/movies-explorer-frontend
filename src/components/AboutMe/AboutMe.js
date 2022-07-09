import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.jpg'

function AboutMe() {
  return (
    <section className="about">
      <h2 className="about__title">Студент</h2>
      <div className="about__main-container">
        <div className="about__container">
          <h3 className="about__name">Ксения</h3>
          <h4 className="about__info">Инженер-конструктор, 31 год</h4>
          <p className="about__description">Мой родной город Самара, а сейчас уже 8 лет я живу в Алматы. 
          Работала на крупном производстве металлоконструкций. На данный момент в декрете. Замужем, есть сын. 
          Люблю активный отдых, путешествия и английский язык. Решила попробовать себя в веб-разработке и, 
          возможно, сменить профессию.</p>
          <ul className="about__list">
            <li><a href="https://www.linkedin.com/in/ksenia-bostanova-2923551a9/" className="about__social" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
            <li><a href="https://github.com/XeniaBostanova" className="about__social" target="_blank" rel="noopener noreferrer">Github</a></li>
          </ul>
        </div>
        <img className="about__photo" src={photo} alt="Фото" />
      </div>
    </section>
  )
}

export default AboutMe;