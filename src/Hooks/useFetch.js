import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
	const [response, setResponse] = useState({});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const getData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(url, options);
				const json = await response.json();
				if (!signal.aborted) {
					setResponse(json);
				}
			} catch (error) {
				if (!signal.aborted) {
					setError(error);
				}
			} finally {
				if (!signal.aborted) {
					setIsLoading(false);
				}
			}
		};
		getData();
		return () => {
			abortController.abort();
		};
	}, [options, url]);

	return { response, isLoading, error };
};

export default useFetch;
