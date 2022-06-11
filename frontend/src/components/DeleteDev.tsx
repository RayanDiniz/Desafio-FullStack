import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Button, Modal, IconButton, Collapse, Alert, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import api from "../server/api";
import { FaTrash } from 'react-icons/fa';
const DeleteDev = React.forwardRef((parms: any) => {
  const [ddev, setDdev] = React.useState(false);
  const handleDdevOpen = () => setDdev(true);
  const handleDdevClose = () => setDdev(false);

  const [error, setError] = React.useState(false);
  const [tpmsg, setTpmsg]: any = React.useState("success");
  const [msg, setMsg] = React.useState("");
  const id: any = parms;

  const handleDeleteDev = () => {
    api.delete(`dev/${id.parms}`)
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

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }

  return (
    <>
      <Tooltip title="Deletar Dev">
        <IconButton aria-label="delete" onClick={handleDdevOpen}>
          <FaTrash color="red" />
        </IconButton>
      </Tooltip>
      <Modal
        open={ddev}
        onClose={handleDdevClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deletar Desenvolvedor
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
            <Typography variant="subtitle1" gutterBottom component="div">
              Tem certeza que deseja deletar este Developer?
            </Typography>
            <Button variant="outlined" startIcon={<FaTrash />} onClick={handleDeleteDev}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
})
export default DeleteDev;