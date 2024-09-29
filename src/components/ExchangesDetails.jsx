import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetExchangesDetailsQuery } from '../services/cryptoExchangesApi';
import { Avatar, Row, Col, Typography, } from 'antd';
import millify from 'millify';
import { LinkOutlined } from '@ant-design/icons';
import { FacebookOutlined } from '@ant-design/icons';
import TickersListWithPieChart from './Tickers';
import Loader from './Loader';

const ExchangesDetails = () => {
  const { exchangeid } = useParams();
  const { data,error,isFetching } = useGetExchangesDetailsQuery(exchangeid);
  if(isFetching){
    return <Loader/>
  }else if (error && error.status === 429) {
    return <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Typography.Text type="danger">Too many requests. Please refresh the page after some time.</Typography.Text>
  </div>
  }  
  return (
    <>
    <Row>
      <Col span={12} style={{ display: 'flex' }}>
        <Avatar size="large" src={data?.image} />
        <Typography.Title style={{ paddingLeft: '10px' }} level={2}>
          {data?.name}
        </Typography.Title>
      </Col>
      <Col xs={24} sm={12} lg={6} style={{display:"flex"}}>
        <Typography.Title className='spot-trading-vol' level={4}>Spot Trading Volume(24h):</Typography.Title>
        <Typography.Text className='spot-trading-vol' >
         {typeof data?.trade_volume_24h_btc === 'number' ? `$${millify(data?.trade_volume_24h_btc)}` : "N/A"}
        </Typography.Text>
      </Col>
      <Col span={24}> 
        <Typography.Paragraph>{data?.description}</Typography.Paragraph>
      </Col>
      <Col span={24} style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <a className="urls" href={data?.url} target='_blank'><LinkOutlined />{data?.name}</a>
        <a className="urls" href={data?.facebook_url} target='_blank'><FacebookOutlined />Facebook</a>
        <a className="urls" href={data?.other_url_1} target='_blank'>Other</a>
      </Col>
    </Row>
    <TickersListWithPieChart tickers={data?.tickers} error={error}/>
    </>
  );
};

export default ExchangesDetails;

