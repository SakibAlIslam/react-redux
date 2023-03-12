import Button from "./Button";
import Count from "./Count";

const Counter = ({ id, increment, decrement, count }) => {
  const incrementStyle = "bg-indigo-400 text-white px-3 py-2 rounded shadow";
  const decrementStyle = "bg-red-400 text-white px-3 py-2 rounded shadow";

  return (
    <div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
      <Count count={count} />
      <div class="flex space-x-3">
        <Button btnStyle={incrementStyle} handler={() => increment(id)}>
          Increment
        </Button>
        <Button btnStyle={decrementStyle} handler={() => decrement(id)}>
          Decrement
        </Button>
      </div>
    </div>
  );
};

export default Counter;
