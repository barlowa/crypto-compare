import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Loading } from '../../Components';
import { useFetch } from '../../Hooks';
import CoinDetailColumns from './CoinDetailColumns';
import Rank from './Rank';

const DetailContainerStyle = styled.div`
	height: calc(100vh - 130px);
	background-color: #132743;
	.coinDetails {
		display: grid;
		grid-template-columns: 1fr 2fr;
		padding-top: 75px;
	}
`;
const DetailContainer = () => {
	const params = useParams();
	const selectedCryptoCurrency = params.id;
	const selectedLocalCurrency = useSelector((state) => state.selectedLocalCurrency);
	const coinList = useSelector((state) => state.coinList);
	const dispatch = useDispatch();

	const [marketValues, setMarketValues] = useState();
	//get the currency
	const { response, isLoading, error } = useFetch(
		`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${selectedCryptoCurrency}&tsyms=${selectedLocalCurrency}`
	);

	useEffect(() => {
		const hasLoadedCoinList = Object.keys(coinList).length ? true : false;

		if (hasLoadedCoinList) {
			console.log(coinList[selectedCryptoCurrency]);
			dispatch({
				type: 'SET_CRYPTO_COIN_DETAILS',
				selectedCryptoCoinDetails: coinList[selectedCryptoCurrency],
			});
		}
	}, [coinList, dispatch, selectedCryptoCurrency]);

	useEffect(() => {
		const responseHasLoaded = Object.keys(response).length ? true : false;
		if (responseHasLoaded && !isLoading && !error) {
			const values = response.DISPLAY[selectedCryptoCurrency][selectedLocalCurrency];
			setMarketValues(values);
			dispatch({
				type: 'SET_CRYPTO_PRICE',
				selectedCryptoPrice: values.PRICE,
			});
		}
	}, [dispatch, error, isLoading, response, selectedCryptoCurrency, selectedLocalCurrency]);

	const { MKTCAP, VOLUME24HOURTO, TOTALTOPTIERVOLUME24HTO } = marketValues || {};
	return (
		<DetailContainerStyle>
			{isLoading ? (
				<Loading />
			) : (
				<div className="coinDetails">
					<Rank rank={1} />
					<CoinDetailColumns
						marketCap={MKTCAP}
						volume24h={VOLUME24HOURTO}
						circulatingSupply={TOTALTOPTIERVOLUME24HTO}
						totalSupply={TOTALTOPTIERVOLUME24HTO}
						cryptoCurrency={selectedCryptoCurrency}
					/>
				</div>
			)}
		</DetailContainerStyle>
	);
};

DetailContainer.propTypes = {};

export default DetailContainer;
