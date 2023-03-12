import Count from "./Count";

const Counter = ({id, increment, decrement, count}) => {
  return (
    <div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
      <h1>{id}</h1>
      <Count count={count}/>
      <div class="flex space-x-3">
        <button
          class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
          onClick={()=> increment(id)}
        >
          Increment
        </button>
        <button
          class="bg-red-400 text-white px-3 py-2 rounded shadow"
          onClick={()=> decrement(id)}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
