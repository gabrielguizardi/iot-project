import { useEffect, useState } from 'react';

import { Typography, AppBar, Toolbar, Box, Container, Grid } from '@material-ui/core';

import Graph from './components/Graph'

import useStyles from './styles';
import api from './services/api';

const App = props => {
  const classes = useStyles();

  const [temperature, setTemperature] = useState([]);
  const [umidity, setUmidity] = useState([]);
  const [groundUmidity, setGroundUmidity] = useState([]);
  const [date, setDate] = useState([]);

  const getThingSpeakData = () => {
    api('/channels/1375804/feeds.json?api_key=OTT0OR127JYXV8S2')
      .then(response => {
        const umidityData = response.data.feeds.map(feed => feed.field1);
        const temperatureData = response.data.feeds.map(feed => feed.field2);
        const umidityGroundData = response.data.feeds.map(feed => feed.field3);
        const dateData = response.data.feeds.map(feed => feed.created_at);

        console.log(response.data.feeds);

        setUmidity(umidityData);
        setTemperature(temperatureData);
        setGroundUmidity(umidityGroundData);
        setDate(dateData);
      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    getThingSpeakData();
  }, [])

  return (
    <Box className={classes.root} minHeight="100vh">
      <Box className={classes.content}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Container>
              <Typography variant="h6">
                Zé Gay e Viadão
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>

        <Container spacing={2}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <div>
                <Graph data={temperature} labels={date} label="Temperatura" />  
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              chora
            </Grid>
            <Grid item md={4} xs={12}>
              chora
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
