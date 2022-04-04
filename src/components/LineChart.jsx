import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import "chartjs-adapter-moment"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  //reverse order for array building due to change in how Rapid Api pulls history data now.
  for (let i = coinHistory?.data?.history?.length - 1; i > 0; i -= 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = coinHistory?.data?.history?.length - 1; i > 0; i -= 1) {
    coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString());
  }
  console.log(coinTimestamp)

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
      options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
              type: 'time',
              },
            }
        }
  };
  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-Typography.Title">
          {coinName} Price Chart
        </Typography.Title>
        <Col className="chart-container">
          <Typography.Title level={5} className="chart-Typography.Title">
            {coinHistory?.data?.change}
          </Typography.Title>
          <Typography.Title level={5} className="chart-Typography.Title">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;