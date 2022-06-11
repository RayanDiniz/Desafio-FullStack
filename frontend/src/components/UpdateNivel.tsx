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

const UpdateNivel = React.forwardRef((parms: any) => {
  const [niveltitle, setNiveltitle]: any = useState("");

  const [error, setError] = React.useState(false);
  const [tpmsg, setTpmsg]: any = React.useState("success");
  const [msg, setMsg] = React.useState("");

  const [univ, setUniv] = React.useState(false);
  const handleUnivOpen = () => setUniv(true);
  const handleUnivClose = () => setUniv(false);

  const id: any = parms;
  const handleUpdateNivel = () => {
    api.put(`/nivel/${id.parms}`,
      { nivel: niveltitle})
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
      <Tooltip title="Atualizar Nivel">
        <IconButton aria-label="update" onClick={handleUnivOpen}>
          <FaEdit color="green"/>
        </IconButton>
      </Tooltip>
      <Modal
        open={univ}
        onClose={handleUnivClose}
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
            <TextField id="standard-basic" label="Nome" variant="standard" onChange={(e) => setNiveltitle(e.target.value)} />

            <Button onClick={handleUpdateNivel} variant="contained">Atualizar</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
})
export default UpdateNivel;