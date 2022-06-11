import * as React from 'react';
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Alert,
  IconButton,
  Collapse,
  Tooltip,
  Modal
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FaEdit } from "react-icons/fa";
import api from "../server/api";

const UpdateDev = React.forwardRef((parms: any) => {
  const [nivelid, setNivelid]: any = useState("");
  const [nome, setNome] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const [datan, setDatan] = React.useState("");
  const [idade, setIdade] = React.useState("");
  const [hobby, setHobby] = React.useState("");

  const [error, setError] = React.useState(false);
  const [tpmsg, setTpmsg]: any = React.useState("success");
  const [msg, setMsg] = React.useState("");

  const [udev, setUdev] = React.useState(false);
  const handleUdevOpen = () => setUdev(true);
  const handleUdevClose = () => setUdev(false);

  const id: any = parms;
  const handleUpdateDev = () => {
    api.put(`/dev/${id.parms}`,
      { nivel_id: nivelid, nome: nome, sexo: sexo, datanascimento: datan, idade: idade, hobby: hobby })
      .then(response => {
        setError(true)
        setTpmsg(response.data.info)
        setMsg(response.data.message)
      })
      .catch(function (error) {
        if (error.response) {
          setError(true)
          setTpmsg(error.response.data.info)
          setMsg(error.response.data.message)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }
  return (
    <>
      <Tooltip title="Atualizar Dev">
        <IconButton aria-label="update" onClick={handleUdevOpen}>
          <FaEdit color="green"/>
        </IconButton>
      </Tooltip>
      <Modal
        open={udev}
        onClose={handleUdevClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Atualizar Desenvolvedor
          </Typography>

          <Box sx={{ width: '100%' }}>
            <Collapse in={error}>
              <Alert
                severity={tpmsg}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {msg}
              </Alert>
            </Collapse>
          </Box>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
            <TextField id="standard-basic" label="Nome" variant="standard" onChange={(e) => setNome(e.target.value)} />

            <Stack direction="row" spacing={2} justifyContent="center" alignItems="stretch">
              <TextField id="standard-basic" type="number" label="Nivel" variant="standard" onChange={(e) => setNivelid(e.target.value)} />
              <TextField id="standard-basic" label="Sexo" variant="standard" onChange={(e) => setSexo(e.target.value)} />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center" alignItems="stretch">
              <label>Data de nascimento: </label>
              <TextField id="standard-basic" type="date" onChange={(e) => setDatan(e.target.value)} />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center" alignItems="stretch">
              <TextField id="standard-basic" type="number" label="Idade" variant="standard" onChange={(e) => setIdade(e.target.value)} />
              <TextField id="standard-basic" label="Hobby" variant="standard" onChange={(e) => setHobby(e.target.value)} />
            </Stack>

            <Button onClick={handleUpdateDev} variant="contained">Atualizar</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
})
export default UpdateDev;