import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

const Graph = ({ data, labels, label }) => {

  return (
    <Line
      data={{
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: [
            'rgba(0, 0, 0, 0)'
          ],
          borderColor: [
            '#335DFD'
          ],
          borderWidth: 1
        }]
      }}
      options={{
        maintainAspectRatio : false
      }}
      heigth={1000}
    />
  );
}

export default Graph;
