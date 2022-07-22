import React from 'react';
import { useFormWithValidation } from '../../utils/validation';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({onSearch}) {
  const { values, handleChange, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.prevent.Dafault();
    onSearch(values.search);
  }
  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <input name="search" type="search" className="search__input" placeholder="Фильм" required/>
          <button type="submit" className="search__button">Найти</button>
        </form>
        <FilterCheckbox />
      </div>
    </div>
  )
}

export default SearchForm;