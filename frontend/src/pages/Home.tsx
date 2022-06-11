import React, { useState, useEffect } from "react";
import { Box, Alert, IconButton, Modal, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FaRedoAlt } from "react-icons/fa";

import api from "../server/api";
import avatar from "../assets/images/avatar.png";

import LongMenu from "../components/Menu";
import CreateDev from "../components/CreateDev";
import DeleteDev from "../components/DeleteDev";
import Social from "../components/Social";
import UpdateDev from "../components/UpdateDev";
const Home = () => {
  const [search, setSearch] = React.useState(""); //estado que irá guardar o valor do input
  const [devs, setDevs]: any = useState(""); //estdo que tera um objeto retornado da API

  const [error, setError] = React.useState(false);
  const [tpmsg, setTpmsg]: any = React.useState("success");
  const [msg, setMsg] = React.useState("");

  const handleErrorClose = () => setError(false);

  useEffect(() => {
    let apiEndpoint = '/devs';
    if (search.length !== 0) {
      apiEndpoint += `?nome=${search}`;
    }
    api.get(apiEndpoint)
      .then(developer => {
        setDevs(developer.data[0])
      })
      .catch(function (error) {
        if (error.response) {
          setError(true)
          setTpmsg(error.response.data.info)
          setMsg(error.response.data.message)
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
  }, [search])

  return (
    <>
      <header className="header">
        <LongMenu />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{ width: '100%' }}
        >
          <input onChange={(e) => setSearch(e.target.value)} type="text" className="input-search" placeholder="Search devs" />
        </Stack>
        <CreateDev />
      </header>

      <div className="container">
        {devs && devs.data.map((dev: any) => {
          let id: number = dev.id;
          let nome: string = dev.nome.split(" ");
          let nomecom;
          if (nome[1]) {
            nomecom = nome[0] + " " + nome[1];
          } else {
            nomecom = nome;
          }
          return (<div key={dev.id} className="card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={avatar} alt="Avatar" className="avatar" />
                <h1>{nomecom}</h1>
              </div>
              <div className="flip-card-back">
                <h1>{dev.nome}</h1>

                <p className="title">{dev.nivel.nivel}</p>

                <p>{dev.hobby}</p>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <DeleteDev parms={dev.id} />
                  <UpdateDev parms={dev.id} />
                </Stack>
                <div className="socialDev">
                  <Social />
                </div>
                <p><button className="btn-contact">Contact</button></p>
              </div>
            </div>
          </div>
          )
        }
        )}
        <footer>
          <Social />
          Rayan Diniz
        </footer>
      </div>
      <Modal
        open={error}
        onClose={handleErrorClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-error">
          <Alert
            severity={tpmsg}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleErrorClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {msg}
          </Alert>
        </Box>
      </Modal>
    </>
  )
}
export default Home;