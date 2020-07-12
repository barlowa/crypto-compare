import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconButtonStyle = styled.input`
	height: ${({ height }) => height};
	width: ${({ width }) => width};
`;

const IconButton = ({ id, onClick, alt, src, width, height }) => {
	return <IconButtonStyle onClick={onClick} type="image" id={id} alt={alt} src={src} width={width} height={height} />;
};

IconButton.propTypes = {
	height: PropTypes.string,
	width: PropTypes.string,
	alt: PropTypes.string,
	id: PropTypes.string,
	src: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
IconButton.defaultProps = {
	height: '30px',
	width: '30px',
	id: 'button',
	alt: 'button',
};
export default IconButton;
