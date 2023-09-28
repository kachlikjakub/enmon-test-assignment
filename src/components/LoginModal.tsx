import React, { useState } from "react";
import { Box, Modal, TextField, Button, Grid, Chip } from "@mui/material";
import { logIn } from "../helpers/loginHelper";
import { InventoryMeter } from "../entities/InventoryMeter";
import { genericModal } from "../style/styles";

function LoginModal(props: {
  jwt: string | null;
  setJwt: React.Dispatch<React.SetStateAction<null>>;
  loginOpened: boolean;
  setData: React.Dispatch<React.SetStateAction<InventoryMeter[]>>;
  setLoginOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { jwt, setJwt, loginOpened, setData, setLoginOpened } = props;

  const [invalid, setInvalid] = useState(false);

  const handleLoginClicked = () => {
    if (jwt) {
      setJwt(null);
      setData([]);
    } else {
      setLoginOpened((prevState: boolean) => !prevState);
    }
    setInvalid(false);
  };

  const handleFormSubmited = async (event: any) => {
    event.preventDefault();
    var { uName, pwd } = document.forms[0];
    const response = await logIn(uName.value, pwd.value);
    if (response.status === 200) {
      setJwt(response.data.jwt);
      handleLoginClicked();
    } else {
      setInvalid(true);
    }
  };

  return (
    <Modal open={loginOpened} onClose={handleLoginClicked}>
      <Box sx={genericModal}>
        <form className="login-wrapper" onSubmit={handleFormSubmited}>
          <div className="input-wrapper">
            <TextField
              label="Email"
              name="uName"
              variant="outlined"
              required
              error={invalid}
            />
            <TextField
              label="Password"
              name="pwd"
              type="password"
              variant="outlined"
              required
              error={invalid}
            />
          </div>
          <Grid container alignItems={"center"}>
            <Grid item xs={9}>
              {invalid ? (
                <Chip color="error" label={"Invalid name or password"} />
              ) : null}
            </Grid>
            <Grid item xs={3}>
              <Button variant="outlined" type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default LoginModal;
