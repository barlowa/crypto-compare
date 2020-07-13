import { useState, useEffect } from 'react';

const useFetch = (url, refreshIntervalInMs) => {
	const [response, setResponse] = useState({});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [intervalCount, setIntervalCount] = useState(0);

	//if a refresh interval parameter has been to the hook, the setIntervalCount will be updated and cause the data to be re-fetched
	useEffect(() => {
		if (refreshIntervalInMs) {
			const timer = setInterval(() => {
				setIntervalCount((count) => count + 1);
			}, refreshIntervalInMs);
			return () => clearTimeout(timer);
		}
	}, [intervalCount, refreshIntervalInMs]);

	//fetches data from the URL parameter with an abort controller incase the request is abandonned.
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const getData = async () => {
			try {
				setIsLoading(true);
				setResponse({});
				const response = await fetch(url);
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
	}, [intervalCount, url]);

	return { response, isLoading, error };
};

export default useFetch;
