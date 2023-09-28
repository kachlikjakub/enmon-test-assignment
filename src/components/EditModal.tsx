import React, { useState } from "react";
import { Box, Button, Modal, Tooltip, Input, InputLabel } from "@mui/material";
import axios from "axios";
import { initialEditModalStates } from "../App";
import { genericModal } from "../style/styles";

interface State {
  [key: string]: string;
}

function EditModal(props: any) {
  const {
    editOpened,
    setEditOpened,
    setEditModalStates,
    editModalStates,
    jwt,
    handleGetDataClick,
  } = props;

  const [modalChanged, setModalChanged] = useState(false);

  const handleModalChanged = (event: any, column: string) => {
    setModalChanged(true);
    setEditModalStates((prevStates: State) => ({
      ...prevStates,
      [column]: event.target.value,
    }));
  };

  const handleSaveEditedRecord = () => {
    axios
      .put(
        `https://tools.dev.enmon.tech/api/inventory-meters/${editModalStates.id}`,
        { data: editModalStates },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        handleGetDataClick();
        setEditOpened(false);
        setModalChanged(false);
        setEditModalStates(initialEditModalStates);
      });
  };

  return (
    <Modal
      open={editOpened}
      onClose={() => {
        setEditOpened(false);
        setModalChanged(false);
      }}
    >
      <Box sx={genericModal}>
        <form
          style={{ rowGap: 15, display: "grid", marginBottom: 30 }}
          onSubmit={() => {}}
        >
          {Object.keys(initialEditModalStates).map((state, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <InputLabel sx={{ width: "50%" }}>{state}</InputLabel>
                <Input
                  sx={{ width: "50%" }}
                  disabled={state === "id"}
                  onChange={(event) => handleModalChanged(event, state)}
                  value={editModalStates[state] ?? ""}
                  name={state}
                />
              </div>
            );
          })}
        </form>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip
            title={!modalChanged ? "Nothing was changed" : ""}
            placement="top"
          >
            <span>
              <Button
                variant="outlined"
                sx={{ justifySelf: "flex-end" }}
                onClick={handleSaveEditedRecord}
                disabled={!modalChanged}
              >
                Save
              </Button>
            </span>
          </Tooltip>
        </div>
      </Box>
    </Modal>
  );
}

export default EditModal;
