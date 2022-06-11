import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Alert,
  IconButton,
  Modal,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Tooltip
} from '@mui/material';

import CloseIcon from '@mui/icons-material';
import { FaArrowAltCircleLeft, FaEdit, FaRedo, FaRedoAlt, FaTrash, BsBookmarkCheckFill } from "react-icons/all";

import api from "../server/api";

import CreateNivel from "../components/CreateNivel";
import DeleteNivel from "../components/DeleteNivel";
import UpdateNivel from "../components/UpdateNivel";
import Social from "../components/Social";

const Niveis = () => {
  const [checked, setChecked] = React.useState([0]);
  const [search, setSearch] = React.useState("");
  const [niveis, setNiveis]: any = useState("");

  const [error, setError] = React.useState(false);
  const [tpmsg, setTpmsg]: any = React.useState("success");
  const [msg, setMsg] = React.useState("");

  const handleErrorClose = () => setError(false);

  useEffect(() => {
    let apiEndpoint = '/niveis';
    if (search.length !== 0) {
      apiEndpoint += `?nivel=${search}`;
    }
    api.get(apiEndpoint)
      .then(niveis => {
        setNiveis(niveis.data)
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

        <Tooltip title="Voltar">
          <Link to="../"><FaArrowAltCircleLeft className="icon" /></Link>
        </Tooltip>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{ width: '100%' }}
        >
          <input onChange={(e) => setSearch(e.target.value)} type="text" className="input-search" placeholder="Search niveis" />
        </Stack>

        <CreateNivel />
      </header>
      <div className="container">
        <List sx={{ width: '100%', maxWidth: "90%", bgcolor: 'background.paper', display: 'inline-block' }}>
          {niveis && niveis.data.map((nivel: any) => {
            const labelId = `checkbox-list-label-${nivel.id}`;

            return (
              <ListItem key={nivel.id}>
                  <ListItemIcon>
                    <BsBookmarkCheckFill />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={nivel.nivel} />
                  <ListItemIcon>


                    <UpdateNivel parms={nivel.id}/>
                  </ListItemIcon>
                  <ListItemIcon>
                    <DeleteNivel parms={nivel.id}/>
                  </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
        <footer>
          <Social />
          Rayan Diniz
        </footer>
      </div>
    </>
  )
}
export default Niveis;