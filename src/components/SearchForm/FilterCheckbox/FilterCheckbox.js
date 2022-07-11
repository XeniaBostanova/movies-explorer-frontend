import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter">
      <label className="filter__switch">
	      <input type="checkbox" className="filter__checkbox" />
	      <span className="filter__slider"></span>
      </label>
      <p className="filter__item">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;