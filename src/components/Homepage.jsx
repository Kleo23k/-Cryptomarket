
import millify from 'millify'
import { Typography,Row,Col,Statistic } from 'antd/es'
import { Link } from 'react-router-dom'
const {Title} = Typography
import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from "./News"
import Loader from './Loader'


const Homepage = () => {
  const {data, isFetching} = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats
  if(isFetching) return <Loader/>
  return (
   <div className='homepage-container'> 
    <Title level={2} className='heading'>Global Crypto Stats</Title>
    <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={millify(globalStats.total)}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
    </Row>
    <div className="home-heading-container" style={{position:"relative"}}>
      <Title level={2} className='home-title'>Top 10 Cryptocurrencies</Title>
    </div>
    <Cryptocurrencies limited/>
    <Title level={4} className='show-more'><Link to="/cryptocurrencies" style={{display:"flex",justifyContent:"flex-end"}}>Show More</Link></Title>
    <div className="home-heading-container">
      <Title level={2} className='home-title'>Latest Crypto News</Title>  
    </div>
    <News limited={12}/>
    <Title level={4} className='show-more' style={{display:"flex",justifyContent:"flex-end"}}><Link to="/news">Show More</Link></Title>
   </div>
  )
}

export default Homepage