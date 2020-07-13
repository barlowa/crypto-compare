const availableLocalCurrencies = ['USD', 'GBP', 'JPY'];

const initialState = {
	coinList: {},
	selectedLocalCurrency: availableLocalCurrencies[0],
	availableLocalCurrencies,
	selectedCryptoCoinDetails: {
		isCoinDetailSet: false,
		Id: '',
		ImageUrl: '',
		Symbol: '',
		FullName: '',
	},
	selectedCryptoPrice: 0,
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_LOCAL_CURRENCY':
			return { ...state, selectedLocalCurrency: action.selectedLocalCurrency };
		case 'SET_CRYPTO_COIN_DETAILS':
			return { ...state, selectedCryptoCoinDetails: { isCoinDetailSet: true, ...action.selectedCryptoCoinDetails } };
		case 'SET_CRYPTO_PRICE':
			return { ...state, selectedCryptoPrice: action.selectedCryptoPrice };
		case 'SET_COIN_LIST':
			return { ...state, coinList: action.coinList };
		case 'REINITIALISE':
			return { ...initialState, coinList: state.coinList, selectedLocalCurrency: state.selectedLocalCurrency };
		default:
			return state;
	}
};

export default Reducer;
