import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const FilterInput = ({
  dispatch
}) => {
  let filterInpText = '';
  let filterInpDate = '';

  const clearAllInputs = () => {
    dispatch(actions.clearFilters());
    filterInpText.value='';
    filterInpDate.value='';
  }
  return (
    <div className="filter__form" >
      <h3>Найдите нужные дела: </h3>
      <label className="filter__label" htmlFor="">
        Фильтр по тексту
        <input className="filter__input"
          onChange={()=>{dispatch(actions.filterFromText(filterInpText.value))}}
          ref={(input)=>{filterInpText=input}} type="text"
        />
      </label>
      <label className="filter__label" htmlFor="">
        Фильтр по дате:
        <input className="filter__input"
          onChange={()=>{dispatch(actions.filterFromDate(filterInpDate.value))}}
          ref={(input)=>{filterInpDate=input}} type="date"
        />
      </label>
      <input className="filter__input button"
        value="Очистить все" type="button"
        onClick={clearAllInputs}
      />
    </div>
  )
}

 export default connect()(FilterInput);;
