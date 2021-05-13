import { Typography, AppBar, Toolbar, Box, Container, Grid } from '@material-ui/core';

import useStyles from './styles';

const App = props => {
  const classes = useStyles();

  return (
    <Box className={classes.root} minHeight="100vh">
      <Box className={classes.content}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Container>
              <Typography variant="h6">
                IoT
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>

        <Container spacing={2}>
          <Grid container>
            <Grid item md={2} xs={12}>
              <h1>1</h1>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
