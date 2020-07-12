import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const HeaderStyle = styled.header`
	height: 160px;
`;

const Header = () => {
	const dispatch = useDispatch();

	const history = useHistory();

	//list of available local currencies from redux
	const availableLocalCurrencies = useSelector((state) => state.availableLocalCurrencies);

	//users currently selected local currency
	const selectedLocalCurrency = useSelector((state) => state.selectedLocalCurrency);

	const { isCoinDetailSet, Id, ImageUrl, Symbol, FullName } = useSelector((state) => state.selectedCryptoCoinDetails);
	const selectedCryptoPrice = useSelector((state) => state.selectedCryptoPrice);

	//send the users local currency to redux
	function changeLocalCurrency(event) {
		dispatch({
			type: 'UPDATE_LOCAL_CURRENCY',
			selectedLocalCurrency: event.target.value,
		});
	}

	function routeToOverviewPage() {
		dispatch({
			type: 'REINITIALISE',
		});
		history.push('/');
	}
	return (
		<HeaderStyle>
			{isCoinDetailSet ? (
				<div>
					<div>
						<button onClick={routeToOverviewPage}>Back</button>
					</div>

					<div>
						<img alt={FullName} src={`https://cryptocompare.com${ImageUrl}`} width="50px" />
					</div>

					<div>
						<div>{FullName}</div>
						<div>{Symbol}</div>
					</div>
					<div>{selectedCryptoPrice}</div>
				</div>
			) : (
				'logo'
			)}
			<div>
				<select onChange={changeLocalCurrency} value={selectedLocalCurrency}>
					{availableLocalCurrencies &&
						availableLocalCurrencies.map((currency) => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
				</select>
			</div>
		</HeaderStyle>
	);
};

Header.propTypes = {};

export default Header;
