import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const FilterInput = ({
  onBtnClick,
  onTextInpChange,
  onDateInpChange
}) => {
  let filterInpText;
  let filterInpDate;

  const clearAllInputs = () => {
    onBtnClick();
    filterInpText.value='';
    filterInpDate.value='';
  }
  return (
    <form action="">
      <h3>Найдите нужные дела: </h3>
      <label htmlFor="">
        Фильтр по тексту
        <input onChange={()=>{onTextInpChange(filterInpText.value)}} ref={(input)=>{filterInpText=input}} type="text"/>
      </label>
      <label htmlFor="">
        Фильтр по дате:
        <input onChange={()=>{onDateInpChange(filterInpDate.value)}} ref={(input)=>{filterInpDate=input}} type="date"/>
      </label>
      <input value="Очистить все" type="button" onClick={clearAllInputs}/>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  onBtnClick: () => {
    dispatch(actions.clearFilters());
  },
  onTextInpChange: (text) => {dispatch(actions.clearFilters());
    dispatch(actions.filterFromText(text));
  },
  onDateInpChange: (date) => {
    dispatch(actions.filterFromDate(date));
  },
});

 export default connect(null, mapDispatchToProps)(FilterInput);;
