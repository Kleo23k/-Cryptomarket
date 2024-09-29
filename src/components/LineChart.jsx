import React from 'react';
import { Col, Row, Typography } from 'antd';
import millify from 'millify';
const { Title } = Typography;
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ArrowDownOutlined } from '@ant-design/icons';
import { ArrowUpOutlined } from '@ant-design/icons';



const LineChart = ({coinHistory, currentPrice, coinName, cryptoColor}) => {
    const colorIndex = coinHistory?.data?.change > 0 ? "success" : "danger";
    const arrowIcon = coinHistory?.data?.change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
    const coinPrice = []
    const coinTimestamp = []
    
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
      }

      
     const data = {
        labels : coinTimestamp,
        datasets : [{
            label:"Price in USD",
            data : coinPrice,
            fill:false,
            borderColor: cryptoColor,
            tension: 0.1
        }]
     }
     const options = {
        scales: {
            x: {
                reverse: true
            },
            y: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };
   

  return (
    <>
   
     <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
        <Col className='price-container'>
            <Title type={colorIndex} level={5} className='price-change'>{arrowIcon} {coinHistory?.data?.change}%</Title>
            <Title level={5} className='current-price'>Current {coinName} Price: $ {millify(currentPrice)}</Title>
        </Col>
     </Row>
     <Line  data={data} options={options}/>
    </> 
  )
}

export default LineChart