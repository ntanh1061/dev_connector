import { createAction, createReducer } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [];

const addAlert = createAction("ADD_ALERT");
const removeAlert = createAction("REMOVE_ALERT");

export const setAlert = (alert) => {
  return (dispatch) => {
    const id = uuidv4();

    dispatch(
      addAlert({
        id,
        ...alert,
      })
    );

    setTimeout(() => {
      dispatch(removeAlert(id));
    }, 3000);
  };
};

const alertReducer = createReducer(initialState, {
  [addAlert]: (state, action) => {
    const { message, type } = action.payload;

    return [
      ...state,
      {
        message,
        type,
      },
    ];
  },
  [removeAlert]: (state, action) => {
    const alert = state.filter((item) => item.id !== action.payload.id);

    return [...alert];
  },
});

export default alertReducer;
