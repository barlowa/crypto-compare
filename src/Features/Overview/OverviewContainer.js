import React from 'react';
import { useSelector } from 'react-redux';
import { useFetch } from '../../Hooks';
import { Loading } from '../../Components';
import { useHistory } from 'react-router';
import OverviewTable from './OverviewTable';

const OverviewContainer = () => {
	const history = useHistory();

	const selectedLocalCurrency = useSelector((state) => state.selectedLocalCurrency);

	//fetches the list of crypto coins from the API with the selected currency
	const { response, isLoading } = useFetch(
		`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${selectedLocalCurrency}`
	);

	//data in the clicked row from is passed a parameter, user is then pushed to the detail page
	function handleClickedRow({ CoinInfo }) {
		history.push(`/${CoinInfo.Name}`);
	}

	return (
		<div>
			{isLoading ? (
				<Loading />
			) : (
				<OverviewTable
					data={response.Data}
					selectedLocalCurrency={selectedLocalCurrency}
					handleClickedRow={handleClickedRow}
				/>
			)}
		</div>
	);
};

OverviewContainer.propTypes = {};

export default OverviewContainer;
