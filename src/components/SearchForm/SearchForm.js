import React from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form">
          <input type="text" className="search__input" placeholder="Фильм" />
          <button type="submit" className="search__button">Найти</button>
        </form>
        <FilterCheckbox />
      </div>
    </div>
  )
}

export default SearchForm;