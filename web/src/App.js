import { useEffect, useState } from 'react';
import Moment from 'moment';
import { Typography, AppBar, Toolbar, Box, Container, Grid, Paper } from '@material-ui/core';

import { Graph } from './components'

import useStyles from './styles';
import api from './services/api';

const App = () => {
  const classes = useStyles();

  const [temperature, setTemperature] = useState([]);
  const [umidity, setUmidity] = useState([]);
  const [groundUmidity, setGroundUmidity] = useState([]);
  const [dataset, setDataset] = useState({});

  const getThingSpeakData = () => {
    api('/channels/1375804/feeds.json?api_key=OTT0OR127JYXV8S2&results=20')
      .then(response => {
        const umidityData = response.data.feeds.map(feed => feed.field1);
        const temperatureData = response.data.feeds.map(feed => feed.field2);
        const umidityGroundData = response.data.feeds.map(feed => feed.field3);
        const dateData = response.data.feeds.map(feed => Moment(feed.created_at).format('DD/MM HH:mm'));

        setDataset({
          labels: dateData,
          datasets: [
            {
              type: 'bar',
              label: 'Temperatura º',
              data: temperatureData,
              backgroundColor: ['#FF3068'],
              borderColor: ['#FF3068'],
              borderWidth: 1
            },
            {
              type: 'line',
              label: 'Umidade %',
              data: umidityData,
              backgroundColor: ['#288FFC'],
              borderColor: ['#288FFC'],
              borderWidth: 1,
              fill: false
            },
            {
              type: 'bar',
              label: 'Umidade de solo %',
              data: umidityGroundData,
              backgroundColor: ['#FFD65B'],
              borderColor: ['#FFD65B'],
              borderWidth: 1
            }
          ]
        });
        
        setUmidity(umidityData);
        setTemperature(temperatureData);
        setGroundUmidity(umidityGroundData);
      })
      .catch(error => {
        console.error(error);
      })
  }

  const automaticLoadRequest = () => {
    setInterval(getThingSpeakData, 15000)
  }


  useEffect(() => {
    getThingSpeakData()
    automaticLoadRequest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className={classes.root} minHeight="100vh">
      <Box className={classes.content}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Container>
              <Typography variant="h6">
                IOT
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>

        <Container spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper p={2} mt={2} component={Box} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h6">
                  Temperatura
                </Typography>

                <Typography variant="h3" className={classes.temperatureColor}>
                  {Number(temperature[temperature.length -1] || 0).toFixed(2)}ºc
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper p={2} mt={2} component={Box} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h6">
                  Umidade do ar
                </Typography>

                <Typography variant="h3" className={classes.umidityColor}>
                  {Number(umidity[umidity.length -1] || 0).toFixed(2)}%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper p={2} mt={2} component={Box} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h6">
                  Umidade do solo
                </Typography>

                <Typography variant="h3" className={classes.groundUmidityColor}>
                  {Number(groundUmidity[groundUmidity.length -1] || 0).toFixed(2)}%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper component={Box} p={2} mt={2}>
                <Box>
                  <Graph datasets={dataset} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
