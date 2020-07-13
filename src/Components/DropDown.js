import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectStyle = styled.select`
	width: 200px;
	height: 40px;
	border-width: 0 0 1px 0;
`;
const DropDown = ({ onChange, value, children }) => {
	return (
		<SelectStyle onChange={onChange} value={value}>
			{children}
		</SelectStyle>
	);
};

DropDown.propTypes = {
	children: PropTypes.any,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default DropDown;
