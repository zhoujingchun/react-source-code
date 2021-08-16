/*
import React from "./react";
import ReactDOM from "./react-dom";

//useState 是一个语法糖，基于useReducer
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  onClick = () => {
    this.setState((state) => ({ number: state.number + 1 }));
    console.log(this.state.number);
    this.setState((state) => ({ number: state.number + 1 }));
    console.log(this.state.number);
  };
  render() {
    return (
      <div id="counter">
        <span>{this.state.number}</span>
        <button onClick={this.onClick}>加1</button>
      </div>
    );
  }
}
const ADD = "ADD";
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };
    default:
      return state;
  }
}
function FunctionCounter() {
  const [numberState, setNumberState] = React.useState({ number: 0 }); //0

  const [countState, dispatch] = React.useReducer(reducer, { count: 0 }); //0

  const handleNumber = () => {
    setNumberState({ number: numberState.number + 1 });
  };
  return (
    <div>
      <div id="counter1">
        <h1>num 加</h1>
        <span>{numberState.number}</span>
        <button
          // onClick={() => setNumberState({ number: numberState.number + 1 })}
          onClick={handleNumber}
        >
          加1
        </button>
      </div>
      <div id="counter2">
        <span>{countState.count}</span>
        <button onClick={() => dispatch({ type: ADD })}>加1</button>
      </div>
    </div>
  );
}
ReactDOM.render(
  <FunctionCounter name="计数器" />,
  // <ClassCounter />,
  document.getElementById("root")
);
*/

import React, { useEffect, useLayoutEffect } from "react";
import { render } from "./useReducer/ReactFiberWorkLoop";
import { useReducer } from "./useReducer/ReactFiberHooks";

function reducer(state, action) {
  if (action.type === "add") {
    return state + 1;
  } else {
    return state;
  }
}

function Counter1() {
  const [number, dispatch] = useReducer(reducer, 0);
  return (
    <div
      onClick={() => {
        dispatch({ type: "add" });
        dispatch({ type: "add" });
        dispatch({ type: "add" });
      }}
    >
      {number}
    </div>
  );
}

let counterFiber = {
  tag: 2,
  type: Counter1,
  alternate: null,
};

render(counterFiber);
