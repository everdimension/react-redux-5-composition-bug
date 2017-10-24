import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { createAction, handleAction } from 'redux-actions';
import { compose, withProps } from 'recompose';
import './index.css';

const action1 = createAction('action1', () => 5);
const store1 = createStore(
  handleAction(
    action1,
    (state, action) => ({
      counter1: state.counter1 + action.payload,
    }),
    { counter1: 0 },
  ),
);

const action2 = createAction('action2', () => 7);
const store2 = createStore(
  handleAction(
    action2,
    (state, action) => ({
      counter2: state.counter2 + action.payload,
    }),
    { counter2: 0 },
  ),
);

function Hello({ counter1, counter2 }) {
  return (
    <div>
      <p>
        Connected counter1: {counter1}
        <br />
        <button onClick={() => store1.dispatch(action1())}>
          add 5 to first store
        </button>
      </p>
      <p>
        Connected counter2: {counter2}
        <br />
        <button onClick={() => store2.dispatch(action2())}>
          add 7 to second store
        </button>
      </p>

      <div id="store1" />
      <div id="store2" />
    </div>
  );
}

const withCounter1 = compose(
  withProps({ store: store1 }),
  connect(state => state),
);

const withCounter2 = compose(
  withProps({ store: store2 }),
  connect(state => state),
);

const App = compose(withCounter1, withCounter2)(Hello);

ReactDOM.render(<App />, document.getElementById('app'));

const store1div = document.getElementById('store1');
const store2div = document.getElementById('store2');

const updateStore1Div = () => {
  store1div.textContent = `True store1 value: ${store1.getState().counter1}`;
};

const updateStore2Div = () => {
  store2div.textContent = `True store2 value: ${store2.getState().counter2}`;
};

updateStore1Div();
updateStore2Div();
store1.subscribe(updateStore1Div);
store2.subscribe(updateStore2Div);
