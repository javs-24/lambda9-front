import React, { useContext } from "react";
import { MyContext } from "../../App";
import styled from "styled-components";

import { Line } from 'react-chartjs-2';

const InvocationGraph: React.FunctionComponent<any> = props => {

  let invocations = props.graphData.invocations
  let timestamps = props.graphData.timestamps
  if (typeof invocations === 'string' && timestamps === 'string') {
    invocations = JSON.parse(invocations)
    timestamps = JSON.parse(timestamps)
    //   }
    //   console.log('invoke', invocations)
    //   console.log('time', timestamps)

    //   const mani = []
    //   for (let ele of timestamps) {
    //     mani.push(new Date(ele))
    //   }

    //   console.log('mani', mani)
    var options = {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: ''
      },
      maintainAspectRatio: false,
    };
    var mockdata = {
      labels: ['2019-07-24', '2019-07-16', '2019-07-15', '2019-07-11', '2019-07-10'],
      datasets: [
        {
          label: 'dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: [23, 13, 7, 10, 5]
        }
      ]
    };
  }

  return (
    <div>
      <StyledGraph>
        {<Line data={mockdata} options={options} />}
      </StyledGraph>
    </div>
  );
};

const StyledGraph = styled.div`
  width: 425px;
`
export default InvocationGraph;
