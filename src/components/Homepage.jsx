import React from 'react';
import millify from 'millify';//Converts long numbers to pretty, human-readable strings
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from '../components'

import  { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography; //since we are using alot of <Typography.Title> components, we can destruction to use <Title>

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);//ten is passed in as the count, # of results to display
    const globalStats = data?.data?.stats;

    if(isFetching) return 'Loading...';

    console.log(data)
    return (
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>{/*antd width spaces is 24, this will take half the screen*/}
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptocurrencies</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
            </div>
            <News simplified />
        </>
    );
}

export default Homepage;