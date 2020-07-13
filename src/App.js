import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DetailContainer, OverviewContainer } from './Features';
import HeaderContainer from './Features/Header/HeaderContainer';
import { useFetch } from './Hooks';

function App() {
	const dispatch = useDispatch();
	const { response } = useFetch('https://min-api.cryptocompare.com/data/all/coinlist?summary=true');

	//not the way i would have liked to have done this. CoinInfo is only presented in mktcapfull endpoint which doesnt work if you go directly to the crypto detail page.
	useEffect(() => {
		const hasLoaded = Object.keys(response).length ? true : false;
		if (hasLoaded) {
			dispatch({
				type: 'SET_COIN_LIST',
				coinList: response.Data || {},
			});
		}
	}, [response, dispatch]);

	return (
		<Router>
			<HeaderContainer />
			<div>
				<Switch>
					<Route exact path="/" component={OverviewContainer} />
					<Route path="/:id" component={DetailContainer} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
