import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DetailItemStyle = styled.div`
	.description {
		text-transform: uppercase;
		color: #486c8a;
		font-size: 16px;
	}
	.value {
		font-size: 28px;
		color: #e6e6e6;
		display: flex;
		align-items: center;
	}
	.currency {
		color: #33cd7a;
		font-size: 16px;
		margin-left: 15px;
	}
`;
const DetailItem = ({ description, value, cryptoCurrency }) => {
	return (
		<DetailItemStyle>
			<div className="description">{description}</div>
			<div className="value">
				{value}
				{cryptoCurrency ? <div className="currency">{cryptoCurrency}</div> : null}
			</div>
		</DetailItemStyle>
	);
};

DetailItem.propTypes = {
	cryptoCurrency: PropTypes.string,
	description: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default DetailItem;
