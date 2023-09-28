import React, { useEffect, useState } from "react";
import "./App.css";
import "./style/styles.css";

import axios from "axios";

import { Button, Grid, Tooltip } from "@mui/material";
import LoginModal from "./components/LoginModal";
import EditModal from "./components/EditModal";
import MetersTable from "./components/MetersTable";
import { InventoryMeter } from "./entities/InventoryMeter";

interface State {
  [key: string]: string;
}

export const initialEditModalStates: State = {
  id: "",
  accessibility: "",
  backend_gateway_meter_id: "",
  owner: "",
  unit: "",
  createdAt: "",
};

function App() {
  const [loginOpened, setLoginOpened] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [data, setData] = useState<Array<InventoryMeter>>([]);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [isAsc, setIsAsc] = useState(true);
  const [selectedRow, setSelectedRow] = useState<string | undefined>();
  const [editOpened, setEditOpened] = useState(false);
  const [editModalStates, setEditModalStates] = useState(
    initialEditModalStates
  );

  const handleLoginClicked = () => {
    if (jwt) {
      setJwt(null);
      setData([]);
      setEditModalStates(initialEditModalStates);
      setSelectedRow(undefined);
    } else {
      setLoginOpened((prevState: boolean) => !prevState);
    }
  };

  useEffect(() => {
    if (jwt !== null) {
      handleGetDataClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, page, orderBy, isAsc]);

  const handleGetDataClick = () => {
    axios
      .get(
        `https://tools.dev.enmon.tech/api/inventory-meters?pagination[page]=${
          page + 1
        }&pagination[pageSize]=10${
          orderBy !== "" ? `&sort[0]=${orderBy}:${isAsc ? "asc" : "desc"}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        setData(
          response.data.map(
            (record: {
              id: string;
              accessibility: string;
              backend_gateway_meter_id: string;
              owner: string;
              unit: string;
              createdAt: string;
            }) => new InventoryMeter({ ...record })
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditRecordClick = () => {
    setEditOpened(true);
    const selectedRecord = data.find((record) => {
      return record.id === selectedRow;
    });
    setEditModalStates({
      ...selectedRecord,
    });
  };

  return (
    <div className="App">
      <Grid container alignItems={"center"}>
        <Grid item xs={3} />

        <Grid item xs={6}>
          <h1>Enmon test assignment</h1>
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={handleLoginClicked}
            variant={jwt ? "contained" : "outlined"}
          >
            {jwt ? "Log out" : "Log in"}
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginBottom: 20 }}>
        {jwt ? (
          <Tooltip title={selectedRow ? "" : "You need to select record first"}>
            <span>
              <Button
                disabled={selectedRow === undefined}
                onClick={handleEditRecordClick}
              >
                Edit record
              </Button>
            </span>
          </Tooltip>
        ) : null}
      </div>
      {!jwt ? (
        <p>To see data, you need to log in first.</p>
      ) : (
        <MetersTable
          data={data}
          isAsc={isAsc}
          orderBy={orderBy}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          setEditModalStates={setEditModalStates}
          setPage={setPage}
          page={page}
          setOrderBy={setOrderBy}
          setEditOpened={setEditOpened}
          setIsAsc={setIsAsc}
        />
      )}
      <LoginModal
        jwt={jwt}
        setJwt={setJwt}
        loginOpened={loginOpened}
        setData={setData}
        setLoginOpened={setLoginOpened}
      />
      <EditModal
        handleGetDataClick={handleGetDataClick}
        editOpened={editOpened}
        setEditOpened={setEditOpened}
        setEditModalStates={setEditModalStates}
        editModalStates={editModalStates}
        jwt={jwt}
      />
    </div>
  );
}

export default App;
