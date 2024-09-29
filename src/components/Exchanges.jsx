
import React, { useState } from 'react';
import { useGetExchangesQuery } from '../services/cryptoExchangesApi';
import Loader from './Loader';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import millify from 'millify';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const Exchanges = () => {
  const { data,error, isFetching } = useGetExchangesQuery();
  if (isFetching) return <Loader />;
  if(error && error.status === 429){
    return <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography.Text type="danger">Too many requests. Please refresh the page after some time.</Typography.Text>
          </div>
        }
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>Exchange</Col>
        <Col span={6}>Trust Score</Col>
        <Col span={6}>Trading volume(24h)</Col>
        <Col span={6}>Year established</Col>
      </Row>
      <Row gutter={[16, 16]}>
        {data?.map(exchange => {
          let rankColor;
          switch (true) {
            case exchange.trust_score>= 6:
              rankColor = 'rgba(22, 199, 132)'; 
              break;
            case exchange.trust_score>= 4:
              rankColor = 'rgb(245, 185, 127)'; 
              break;
            default:
              rankColor = 'rgb(189, 41, 41)'; 
              break;
          }
          return (
            <Col span={24} key={exchange.id}>
              <Link to={`/exchanges/details/${exchange.id}`}>
               <Card >
                <Row className="card-exchanges"gutter={[16, 16]}>
                  <Col span={6} >
                    <Text >{exchange.trust_score_rank}</Text>
                    <Avatar className="exchange-image" src={exchange.image} />
                    <Text className='exchange-name'>{exchange.name}</Text>
                  </Col>
                  <Col span={6} >
                    <Text style={{ backgroundColor: rankColor,padding:"10px",borderRadius:"10px" }}>{exchange.trust_score}</Text>
                  </Col>
                  <Col span={6} className='trade-vol'>${millify(exchange.trade_volume_24h_btc)}</Col>
                  <Col span={6} className='year-estab'>
                    {exchange.year_established ? <Text >{exchange.year_established}</Text> : "N/A" }
                  </Col>
                </Row>
               </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Exchanges;