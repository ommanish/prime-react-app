import { Card } from "primereact/card";
import React, { useState } from "react";
import { Button } from "primereact/button";
const Counter = () => {
  const [state, setState] = useState({ count: 0 });

  const incr = () => {
    setState({ ...state, count: state.count + 1 });
  };

  const decr = () => {
    setState({ ...state, count: state.count - 1 });
  };

  return (
    <>
      <div className="col-4">
        <Card className="m-3 shadow-5">
          <h3 className="text-4xl text-center p-0">{state.count}</h3>
          <Button
            onClick={incr}
            label={"Increment"}
            className="p-button-success mr-2"
          />
          <Button
            onClick={decr}
            label={"Decrement"}
            className="p-button-warning "
          />
        </Card>
      </div>
    </>
  );
};

export default Counter;
