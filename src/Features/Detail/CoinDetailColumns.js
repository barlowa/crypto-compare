import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DetailItem from './DetailItem';

const CoinDetailStyle = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 50px;
`;

const CoinDetailColumns = ({ marketCap, volume24h, circulatingSupply, totalSupply, cryptoCurrency }) => {
	return (
		<CoinDetailStyle>
			<DetailItem description="Market Cap" value={marketCap} />
			<DetailItem description="24h Volume" value={volume24h} />
			<DetailItem description="Circulating Supply" value={circulatingSupply} cryptoCurrency={cryptoCurrency} />
			<DetailItem description="Total Supply" value={totalSupply} cryptoCurrency={cryptoCurrency} />
		</CoinDetailStyle>
	);
};

CoinDetailColumns.propTypes = {
	circulatingSupply: PropTypes.string.isRequired,
	cryptoCurrency: PropTypes.string.isRequired,
	marketCap: PropTypes.string.isRequired,
	totalSupply: PropTypes.string.isRequired,
	volume24h: PropTypes.string.isRequired,
};

export default CoinDetailColumns;
