
import React from 'react';
import { Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';
import HTMLReactParser from 'html-react-parser/lib/index';



const { Text, Title } = Typography;

const News = ({limited}) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery();
  
  if (!cryptoNews) return <Loader />;

  const handleCardClick = (url) => {
    window.open(url,"_blank"); 
  };

  const parseContent = (content) => {
    const parsedHtml = HTMLReactParser(content);
    const pElements = parsedHtml.filter((element) => element.type === 'p');
    if (pElements.length > 0) {
      return pElements[0];
    } else {
      return null;
    }
  };

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews?.data?.items.slice(0, limited).map((news) => (
        <Col xs={24} sm={12} lg={8} key={news.title}>
          <Card
            hoverable
            className="news-card"
            onClick={() => handleCardClick(news.url)}
            style={{ cursor: 'pointer' }}
          >
            <div className='news-card-content'>
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  style={{ maxWidth: '50px' , maxHeight: '50px', objectFit: 'cover', borderRadius: '20px' }}
                  src={news.image_url}
                  alt="news"
                />
              </div>
              {parseContent(news.content)}
              <div className="provider-container">
                <div>
                  <Text strong>Published on {new Date(news.timestamp).toLocaleString()}</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
