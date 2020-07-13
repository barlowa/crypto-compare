import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { IconButton, DropDown } from './Components';
import { back, logo } from './Assets';
import styled from 'styled-components';

const HeaderStyle = styled.header`
	display: grid;
	height: 130px;
	grid-template-columns: 3fr 1fr;
	align-items: center;
	padding: 0 40px;

	.iconDetail {
		display: grid;
		grid-template-columns: 30px 50px minmax(100px, auto) 1fr;
		grid-gap: 40px;
		align-items: center;
	}
	.cryptoName {
		font-size: 20px;
	}
	.cryptoSymbol {
		font-size: 12px;
	}
	.cryptoPrice {
		font-size: 28px;
	}
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
				<div className="iconDetail">
					<div>
						<IconButton src={back} onClick={routeToOverviewPage}>
							Back
						</IconButton>
					</div>

					<div>
						<img alt={FullName} src={`https://cryptocompare.com${ImageUrl}`} width="50px" />
					</div>

					<div>
						<div className="cryptoName">{FullName}</div>
						<div className="cryptoSymbol">{Symbol}</div>
					</div>
					<div className="cryptoPrice">{selectedCryptoPrice}</div>
				</div>
			) : (
				<div>
					<img src={logo} alt="VF Crypto" />
				</div>
			)}
			<div>
				<DropDown onChange={changeLocalCurrency} value={selectedLocalCurrency}>
					{availableLocalCurrencies &&
						availableLocalCurrencies.map((currency) => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
				</DropDown>
			</div>
		</HeaderStyle>
	);
};

Header.propTypes = {};

export default Header;
