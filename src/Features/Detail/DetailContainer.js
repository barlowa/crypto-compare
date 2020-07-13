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
	const dispatch = useDispatch();

	//crypto currency from the url parameter
	const params = useParams();
	const cryptoCurrency = params.id;

	//local currency from redux
	const localCurrency = useSelector((state) => state.selectedLocalCurrency);
	const coinList = useSelector((state) => state.coinList);

	//get the price information for the selected currencies
	const { response, isLoading, error } = useFetch(
		`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${localCurrency}`,
		60000
	);

	//price information from api
	const [priceInformation, setPriceInformation] = useState({
		PRICE: '',
		MKTCAP: '',
		VOLUME24HOURTO: '',
		TOTALTOPTIERVOLUME24HTO: '',
	});

	//sets the crypto coin details in the header
	useEffect(() => {
		if (!isLoading && !error) {
			dispatch({
				type: 'SET_CRYPTO_COIN_DETAILS',
				selectedCryptoCoinDetails: coinList[cryptoCurrency],
			});
		}
	}, [coinList, dispatch, error, isLoading, cryptoCurrency]);

	//updates the price information in the header and the page
	useEffect(() => {
		if (!isLoading && !error) {
			const values = response.DISPLAY[cryptoCurrency][localCurrency] || {
				MKTCAP: '',
				VOLUME24HOURTO: '',
				TOTALTOPTIERVOLUME24HTO: '',
				PRICE: '',
			};
			dispatch({
				type: 'SET_CRYPTO_PRICE',
				selectedCryptoPrice: values.PRICE,
			});
			setPriceInformation(values);
		}
	}, [dispatch, error, isLoading, response.DISPLAY, cryptoCurrency, localCurrency]);

	const { MKTCAP, VOLUME24HOURTO, TOTALTOPTIERVOLUME24HTO } = priceInformation || {};
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
						cryptoCurrency={cryptoCurrency}
					/>
				</div>
			)}
		</DetailContainerStyle>
	);
};

export default DetailContainer;
