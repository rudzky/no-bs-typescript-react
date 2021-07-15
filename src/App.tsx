import React, { useCallback } from "react";

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

function App() {
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
    </div>
  );
}

export default App;
