import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch } from '../../Hooks';
import { useParams } from 'react-router';

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
		<div>
			{isLoading ? (
				'loading'
			) : (
				<div>
					<div>{MKTCAP}</div>
					<div>{VOLUME24HOURTO}</div>
					<div>{TOTALTOPTIERVOLUME24HTO}</div>
				</div>
			)}
		</div>
	);
};

DetailContainer.propTypes = {};

export default DetailContainer;
