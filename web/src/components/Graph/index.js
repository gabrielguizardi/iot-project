import { Bar } from 'react-chartjs-2';

import useStyles from './styles';

const Graph = ({ datasets, labels }) => {
  const classes = useStyles();

  return (
    <Bar
      className={classes.root}
      data={datasets}
      options={{
        maintainAspectRatio : false,
        plugins: {
          title: {
            display: true,
            text: 'Monitoramento Geral'
          }
        }
      }}
    />
  );
}

export default Graph;
