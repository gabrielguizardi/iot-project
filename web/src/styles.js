import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%'
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto'
  },
  navbar: {
    backgroundColor: grey[900]
  },
  temperatureColor: {
    color: '#FF3068'
  },
  umidityColor: {
    color: '#288FFC'
  },
  groundUmidityColor: {
    color: '#FFD65B'
  }
}));
