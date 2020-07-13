import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RankStyle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.rankText {
		text-transform: uppercase;
		color: #486c8a;
		font-size: 16px;
		margin-right: 25px;
	}
	.rankNumber {
		display: flex;
		height: 50px;
		width: 50px;
		background-color: #1e3859;
		color: #539deb;
		border-radius: 25px;
		align-items: center;
		justify-content: center;
	}
`;
const Rank = ({ rank }) => {
	return (
		<RankStyle>
			<div className="rankText">RANK</div>
			<div className="rankNumber">{rank}</div>
		</RankStyle>
	);
};

Rank.propTypes = {
	rank: PropTypes.number.isRequired,
};

export default Rank;
