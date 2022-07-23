import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/validation';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({onSearch}) {
  const { values, handleChange, isValid } = useFormWithValidation();

  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const value = localStorage.getItem('checkboxStatus');
      if (location.pathname === '/movies') {
        if (localStorage.getItem('request')) {
          setRequest(localStorage.getItem('request'));
        } 
        if (JSON.parse(value) === true) {
          setCheckboxStatus(true);
        } else {
          setCheckboxStatus(false);
        }
      }  
    }, [location.pathname])

  useEffect(() => {
    const disabled = !isValid
    setDisabled(disabled);
  }, [isValid]);

  function handleChangeRequest(e) {
    handleChange(e);
    setRequest(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(request, checkboxStatus);
  }

  function toggleCheckbox(checkboxStatus) {
    setCheckboxStatus(checkboxStatus);
    onSearch(values.request, checkboxStatus);
  }

  function handleChangeCheckbox(e) {
    toggleCheckbox(e.target.checked);
  }
  
  return (
    <div className="search">
      <div className="search__container">
        <div className="search__form-container">
          <form className="search__form" onSubmit={handleSubmit}>
            <input 
              name="request"
              type="text"
              value={values.request || ''}
              className="search__input"
              placeholder="Фильм"
              onChange={handleChangeRequest}
              required/>
            <button disabled={disabled} type="submit" className="search__button">Найти</button>
          </form>
          <span className="search__input-error">{!disabled ? "" : "Нужно ввести ключевое слово"}</span>
        </div>  
        <FilterCheckbox 
          checkboxStatus={checkboxStatus}
          onChangeCheckbox={handleChangeCheckbox}
        />
      </div>
    </div>
  )
}

export default SearchForm;