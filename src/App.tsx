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
  <button onClick={() => setValue((prev) => prev + 1)}>
    Increment - {value}
  </button>
);

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    isRevert?: boolean | undefined;
  }
> = ({ style, isRevert, children, ...rest }) => {
  const rotateTheButton = useCallback((isRevert) => {
    return isRevert ? { transform: "rotate(90deg)" } : null;
  }, []);

  return (
    <button {...rest} style={{ ...style, ...rotateTheButton(isRevert) }}>
      {children}
    </button>
  );
};

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
      <Button
        onClick={() => console.log("Huh, what do we gonna do?")}
        style={{ background: "red" }}
        // isRevert
      >
        Fire Up Nukes!
      </Button>
    </div>
  );
}

export default App;
