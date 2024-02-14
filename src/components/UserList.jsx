import React, { useEffect, useState } from "react";
import UserService from "../services/UserServices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const UserList = () => {
  const [state, setState] = useState({
    loading: false,
    user: [],
    errorMessage: null,
    globalFilterValue: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const response = await UserService.getAllUsers();
        const { results } = response.data;
        setState((prevState) => ({
          ...prevState,
          loading: false,
          user: results,
        }));
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: err.toString(),
        }));
      }
    }

    fetchUsers();
  }, []);

  const onGlobalFilterChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      globalFilterValue: e.target.value,
    }));
  };

  const clearFilter = () => {
    setState((prevState) => ({
      ...prevState,
      globalFilterValue: "",
    }));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={state.globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const displaySNo = (rowData) => {
    return rowData.login.uuid.substring(0, 5);
  };

  const displayName = (rowData) => {
    return (
      <span>
        {rowData.name.title}. {rowData.name.first} {rowData.name.last}
      </span>
    );
  };

  const displayImage = (rowData) => {
    return (
      <img src={rowData.picture.thumbnail} alt="User Profile" height="100px" />
    );
  };

  const displayAge = (rowData) => {
    return rowData.dob.age + "yrs";
  };

  const footer = `In total there are ${
    state.user ? state.user.length : 0
  } users.`;

  return (
    <>
      <div className="grid">
        <div className="col">
          <DataTable
            value={state.user}
            loading={state.loading}
            paginator
            stripedRows
            header={renderHeader()}
            footer={footer}
            rows={5}
            globalFilter={state.globalFilterValue}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column sortable header="SNO" body={displaySNo} />
            <Column sortable header="Image" body={displayImage} />
            <Column sortable header="Age" body={displayAge} />
            <Column sortable header="Name" body={displayName} />
            <Column sortable header="Email" field="email" />
            <Column sortable header="City" field="location.city" />
            <Column sortable header="State" field="location.state" />
            <Column sortable header="Country" field="location.country" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default UserList;
