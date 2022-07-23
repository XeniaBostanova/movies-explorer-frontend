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
    const disabled = !isValid;
    setDisabled(disabled);
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      const checkbox = localStorage.getItem('checkboxStatus');
      const search = localStorage.getItem('request');

      if (search) {
        setRequest(search);
        setDisabled(!disabled);
      } 
      if (JSON.parse(checkbox) === true) {
        setCheckboxStatus(true);
      } else {
        setCheckboxStatus(false);
      }
    }  
  }, [location.pathname]);

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
              value={request || ''}
              className="search__input"
              placeholder="Фильм"
              onChange={handleChangeRequest}
              required/>
            <button disabled={disabled} type="submit" className="search__button">Найти</button>
          </form>
          <span className="search__input-error_mobile">{!disabled ? "" : "Нужно ввести ключевое слово"}</span>
        </div>  
        <FilterCheckbox 
          checkboxStatus={checkboxStatus}
          onChangeCheckbox={handleChangeCheckbox}
        />
      </div>
      <span className="search__input-error_desktop">{!disabled ? "" : "Нужно ввести ключевое слово"}</span>
    </div>
  )
}

export default SearchForm;