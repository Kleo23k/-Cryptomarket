import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card,Row,Col,Input, Typography } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const Cryptocurrencies = ({limited}) => {
  const count = limited ? 10 : 100
  const {data:cryptosList,isFetching} = useGetCryptosQuery(count)
  const [cryptos,setCryptos] = useState([])
  const [searchTerm,setSearchTerm] = useState("")

  useEffect(()=>{
    const filteredData = cryptosList?.data?.coins.filter(crypto=>crypto.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  },[cryptosList,searchTerm])

  if(isFetching) return <Loader/>

  return (
   <>
   {!limited && (<div className="search-crypto">
                  <Input placeholder='Search Cryptocurrencies' onChange={e=>setSearchTerm(e.target.value)}/>
                </div>)}
    <Row gutter={[30,30]} className='crypto-card-container'>
      {cryptos?.map(currency=>(
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
          <Link to={`/crypto/${currency.uuid}`} key={currency.uuid} >
            <Card  title={`${currency.rank}. ${currency.name}`} extra={<img className='crypto-image' src={currency.iconUrl} />}  hoverable>   
               <p>Price: {millify(currency.price)}</p>
               <p>Market Cap: {millify(currency.marketCap)}</p>
                {currency.change>0 ? (<>
                  <span>Daily Change:</span>
                  <Typography.Text type='success'> {millify(currency.change)}%</Typography.Text>
                </>
                ) : (<>
                 <span>Daily Change:</span>
                 <Typography.Text type='danger'> {millify(currency.change)}%</Typography.Text>
                </>
                )}
            </Card>
          </Link>
        </Col>
       )
      )}
    </Row>
   </>
  )
}

export default Cryptocurrencies