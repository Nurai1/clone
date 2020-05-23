import React from 'react';
import { connect } from 'react-redux';

import {
  clearVisibilityFilters,
  setVisibilityFilterFromText,
  setVisibilityFilterFromDate
} from './../actions';

export const FilterInput = ({
  clearVisibilityFilters,
  setVisibilityFilterFromDate,
  setVisibilityFilterFromText,
  onDateInpChange
}) => {

  return (
    <form className="filterForm">
      <h3>Найдите нужные дела</h3>
      <label htmlFor="">
        Фильтр по тексту:
        <input onChange={(e)=>setVisibilityFilterFromText(e.target.value)} type="text"/>
      </label>
      <label htmlFor="">
        Фильтр по дате:
        <input onChange={(e)=>setVisibilityFilterFromDate(e.target.value)} type="date"/>
      </label>
      {/* <input value="Очистить все" type="button" onClick={clearVisibilityFilters}/>*/}
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  clearVisibilityFilters: () => dispatch(clearVisibilityFilters()),
  setVisibilityFilterFromText: (text) => dispatch(setVisibilityFilterFromText(text)),
  setVisibilityFilterFromDate: (date) => dispatch(setVisibilityFilterFromDate(date)),
});

 export default connect(null, mapDispatchToProps)(FilterInput);;
