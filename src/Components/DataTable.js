import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy, useFlexLayout } from 'react-table';

const Styles = styled.div`
	table {
		width: 100%;
		border-spacing: 0;
		border: none;

		/* table header */
		thead {
			background-color: #ebf0f4;
			color: #adb6c9;
			text-align: left;
		}

		/* table rows */
		tr {
			padding: 0 15%;
			cursor: pointer;
			border-bottom: 1px solid #d8e3eb;
			:last-child {
				border: none;
			}
			:hover {
				background-color: #ebf0f4;
			}
		}

		/* table header cells */
		th {
			height: 40px;
			> div {
				margin-right: 5px;
			}
		}

		/* table data cells*/
		td {
			height: 80px;
			margin: 0;
			color: #606271;
		}

		th,
		td {
			display: flex;
			align-items: center;
			justify-content: center;
			:first-child {
				justify-content: flex-start;
			}
			:last-child {
				justify-content: flex-end;
			}
		}
	}
`;

function DataTable({ columns = [], data = [], rowOnClick }) {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useSortBy,
		useFlexLayout
	);

	return (
		<Styles>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								// Add the sorting props to control sorting. For this example
								// we can add them into the header props
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									<div>{column.render('Header')}</div>
									{/* Add a sort direction indicator */}
									<div>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} onClick={() => rowOnClick(row.original)}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</Styles>
	);
}

export default DataTable;
