import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch } from '../../Hooks';
import { DataTable, Loading } from '../../Components';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const InlineFlex = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	> div {
		margin-right: 10px;
	}
`;
const OverviewContainer = () => {
	const history = useHistory();

	const dispatch = useDispatch();

	const selectedLocalCurrency = useSelector((state) => state.selectedLocalCurrency);

	//fetches the list of crypto coins from the API with the selected currency
	const { response, isLoading } = useFetch(
		`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${selectedLocalCurrency}`
	);

	//row in the table is passed an argument, push to the detail page and set a query string with the rows name
	function handleClickedRow({ CoinInfo, RAW }) {
		console.log(CoinInfo);
		history.push(`/${CoinInfo.Name}`);
	}

	//tells the data table which data to show from the response object
	const columns = React.useMemo(
		() => [
			{
				Header: 'Cryptocurrency',
				accessor: 'CoinInfo.FullName',
				width: 2,
				Cell: ({ row, value }) => {
					return (
						<InlineFlex>
							<div>{row.index + 1}</div>
							<div>
								<img
									alt={row.original.CoinInfo.FullName}
									src={`https://cryptocompare.com${row.original.CoinInfo.ImageUrl}`}
									width="25px"
								/>
							</div>
							<div>{value}</div>
						</InlineFlex>
					);
				},
			},
			{
				Header: 'Price',
				accessor: `DISPLAY.${selectedLocalCurrency}.PRICE`,
				width: 2,
			},
			{
				Header: 'Market cap',
				accessor: `DISPLAY.${selectedLocalCurrency}.MKTCAP`,
				width: 2,
			},
			{
				Header: '24h Change',
				accessor: `DISPLAY.${selectedLocalCurrency}.CHANGE24HOUR`,
				width: 1,
			},
		],

		[selectedLocalCurrency]
	);

	return (
		<div>
			{isLoading ? <Loading /> : <DataTable data={response.Data} columns={columns} rowOnClick={handleClickedRow} />}
		</div>
	);
};

OverviewContainer.propTypes = {};

export default OverviewContainer;
