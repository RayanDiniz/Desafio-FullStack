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
  Badge,
  Modal
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FaPlusCircle, FaUserPlus } from "react-icons/fa";
import api from "../server/api";

const CreteNivel = React.forwardRef(() => {
  const [niveltitle, setNiveltitle]: any = useState("");

  const [error, setError] = React.useState(false);
  const [tpmsg, setTpmsg]: any = React.useState("success");
  const [msg, setMsg] = React.useState("");

  const [cniv, setCniv] = React.useState(false);
  const handleCnivOpen = () => setCniv(true);
  const handleCnivClose = () => setCniv(false);

  const handleCreteNivel = () => {
    api.post('/nivel',
      { nivel: niveltitle })
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
      <Tooltip title="Adicionar Nível">
        <IconButton aria-label="create" onClick={handleCnivOpen}>
          <FaPlusCircle className="icon" />
        </IconButton>
      </Tooltip>
      <Modal
        open={cniv}
        onClose={handleCnivClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adcionar Nível
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
            <TextField id="standard-basic" label="Nivel" variant="standard" onChange={(e) => setNiveltitle(e.target.value)} />

            <Button onClick={handleCreteNivel} variant="contained">Adicionar</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
})
export default CreteNivel;