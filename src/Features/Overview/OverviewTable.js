import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../../Components';
import styled from 'styled-components';

const InlineFlex = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	> div {
		margin-right: 10px;
	}
`;

const Change24HStyle = styled.div`
	color: ${({ value }) => (value > 0 && 'green') || (value < 0 && 'red')};
`;

const OverviewTable = ({ selectedLocalCurrency, data, handleClickedRow }) => {
	//tells the data table which data to show from the response object
	const columns = useMemo(
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
				accessor: `DISPLAY.${selectedLocalCurrency}.CHANGEPCT24HOUR`,
				width: 1,
				Cell: ({ value }) => {
					return <Change24HStyle value={value}>{value} %</Change24HStyle>;
				},
			},
		],

		[selectedLocalCurrency]
	);

	return <DataTable data={data} columns={columns} rowOnClick={handleClickedRow} />;
};

OverviewTable.propTypes = {
	data: PropTypes.array,
	handleClickedRow: PropTypes.func.isRequired,
	selectedLocalCurrency: PropTypes.string.isRequired,
};

export default OverviewTable;
