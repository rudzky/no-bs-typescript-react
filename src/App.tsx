import React, { useCallback, useState } from "react";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const RenderChildren: React.FunctionComponent = ({ children }) => (
  <> {children} </>
);

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

const useNumber = (initialValue: number) => useState<number>(initialValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementer: React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
  <button onClick={() => setValue}>Increment - {value}</button>
);

function App() {
  const [value, setValue] = useState(0);

  const onListClick = useCallback((item) => {
    console.log(item);
  }, []);

  return (
    <div className="App">
      <Heading title="Whatever" />
      <RenderChildren>
        <p>Hello</p>
        <p>How Are You</p>
        <p>Where did you sleep last night</p>
      </RenderChildren>
      <List items={["aaa", "bbb", "ccc"]} onClick={onListClick} />
      <Incrementer value={value} setValue={setValue} />
    </div>
  );
}

export default App;
