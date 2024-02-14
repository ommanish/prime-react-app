import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

const Greet = () => {
  let toast = useRef(null);

  const [state, setState] = useState({
    msg: "",
  });

  const greet = (e) => {
    e.preventDefault();
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: state.msg,
    });
  };

  return (
    <>
      <div className="col-4">
        <Card className="bg-black-alpha-20 m-4">
          <form>
            <InputText
              placeholder={"Message"}
              value={state.msg}
              onChange={(e) => setState({ ...state, msg: e.target.value })}
            />
            <Button
              onClick={greet}
              label="Greet"
              className="p-button-success ml-2"
            />
          </form>
        </Card>
        <Toast ref={toast} />
      </div>
    </>
  );
};

export default Greet;
