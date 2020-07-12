import React from 'react';
import styled from 'styled-components';
import { loadingIcon } from '../Assets';

const LoadingStyle = styled.div`
	display: flex;
	justify-content: center;
`;

const Loading = () => {
	return (
		<LoadingStyle>
			<img src={loadingIcon} alt="loading" />
		</LoadingStyle>
	);
};

Loading.propTypes = {};

export default Loading;
