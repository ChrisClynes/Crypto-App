import React from 'react';
import { useState, useEffect } from 'react';
import millify from 'millify';//Converts long numbers to pretty, human-readable strings
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;//simplified is being passed down through props, if so set to 10, else 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

        setCryptos(filteredData);//this useEffect filters crypto data on page from search input box. (?. is optional chaining, basically wont error if undefined)
    
    }, [cryptosList, searchTerm]);

    if(isFetching) return "Loading...";

    return (
        <>
            {!simplified &&(
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrencies" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            {/*row has gutters or spaces top and bottom and left and right*/}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>{/*need a key anytime you map elements, id 0-49 from the data in this case*/}
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Cryptocurrencies;