import React from 'react';

type CounterPropsType = {
  title: string;
};

const Counter = (props: CounterPropsType) => {
  const { title } = props;

  const [count, setCount] = React.useState(0);
  const [step, setStep] = React.useState(1);

  console.log('render', title);

  const addHandler = () => {
    setCount(count + step);
  };

  const removeHandler = () => {
    setCount(count - step);
  };

  return (
    <div>
      <h5>{title}</h5>
      <p>{`${count} штук добавленно`}</p>
      <div>
        <button type="button" onClick={removeHandler}>
          {`Убрать ${step} ед`}
        </button>
        <button type="button" onClick={addHandler}>
          {`Добавить ${step} ед`}
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setStep(step + 1)}>
          Увиличить шаг на 1 ед
        </button>
        <button type="button" onClick={() => setStep(step - 1)}>
          Уменьшить шаг на 1 ед
        </button>
      </div>
    </div>
  );
};

export default Counter;
