
import React, { useState } from 'react';
import { Row, Col, Typography, Button, Card } from 'antd';
import { Pie } from 'react-chartjs-2';


const TickersListWithPieChart = ({tickers,error}) => {
    const [showMore, setShowMore] = useState(false);
    const [sortBy, setSortBy] = useState(null); 
    
    // Limit the number of tickers to display in the pie chart
    const MAX_TICKERS_FOR_PIE = 12;
    const [displayedTickersCount, setDisplayedTickersCount] = useState(MAX_TICKERS_FOR_PIE)
    const sortedTickers = sortBy ? [...tickers].sort((a, b) => sortBy === 'highToLow' ? b.converted_volume.usd - a.converted_volume.usd : a.converted_volume.usd - b.converted_volume.usd) : tickers;
    const limitedTickers = showMore ? sortedTickers : sortedTickers?.slice(0, MAX_TICKERS_FOR_PIE);
    
    // Extract relevant data for the pie chart from the initial tickers
    const labels = limitedTickers?.map(ticker => `${ticker.base}/${ticker.target}`);
    const data = limitedTickers?.map(ticker => ticker.converted_volume?.usd);

    // Calculate total converted volume
    const totalVolume = data?.reduce((acc, volume) => acc + volume, 0);

    // Calculate percentage of converted volume for each ticker
    const percentages = data?.map(volume => (volume / totalVolume) * 100);
    
    // Prepare data for the pie chart
  
 const pieChartData = {
    labels: labels?.slice(0, displayedTickersCount),
    datasets: [{
        data: percentages?.slice(0, displayedTickersCount),
        backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(189, 159, 64, 0.6)',
            'rgba(89, 14, 28, 0.6)',
            'rgba(40, 150, 69, 0.6)',
            'rgba(38, 166, 9, 0.6)',
            'rgba(203, 178, 205, 0.6)',
            'rgba(99, 156, 2, 0.6)',
            'rgba(177, 11, 234, 0.6)',
        ]?.slice(0, displayedTickersCount),
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(89, 14, 28, 1)',
            'rgba(40, 150, 69, 1)',
            'rgba(38, 166, 9, 1)',
            'rgba(203, 178, 205, 1)',
            'rgba(99, 156, 2, 1)',
            'rgba(177, 11, 234, 1)',
        ]?.slice(0, displayedTickersCount),
        borderWidth: 1,
    }],
 };


    const handleSort = (sortOrder) => {
        setSortBy(sortOrder);
    };

    return (
        <>
            <Typography.Title level={2}>Tickers List</Typography.Title>
            <Row gutter={[16, 16]}>
                {limitedTickers?.map((ticker) => (
                    <Col xs={24} sm={12} lg={6} key={ticker.trade_url}>
                        <Card key={ticker?.trade_url} style={{ marginBottom: 10 }}>
                            <Typography.Text strong>{ticker.base}/{ticker.target}</Typography.Text>: Converted Volume - {ticker.converted_volume?.usd}
                        </Card>
                    </Col>
                ))}
                {tickers?.length > MAX_TICKERS_FOR_PIE && !showMore && (
                    <Button style={{ marginLeft: "20px" }} onClick={()=>setShowMore(true)}>Show More</Button>
                )}
                {showMore && (
                    <Button style={{ marginLeft: "20px" }} onClick={()=>setShowMore(false)}>Hide</Button>
                )}
                <Button style={{ marginLeft: "20px" }} onClick={() => handleSort('highToLow')}>Sort High to Low</Button>
                <Button style={{ marginLeft: "20px" }} onClick={() => handleSort('lowToHigh')}>Sort Low to High</Button>
                
            </Row>
            <div className='pieChart' style={{ display: "flex", flexDirection: "column", width: '100%', maxWidth: '500px', margin: "auto"}}>
                    <Typography.Title level={2}>Distribution of Converted Volume by Ticker</Typography.Title>
                    <Pie data={pieChartData} />
            </div>
        </>
    );
};

export default TickersListWithPieChart;

