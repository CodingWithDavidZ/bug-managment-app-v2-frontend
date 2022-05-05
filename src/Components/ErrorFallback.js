import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorFallback({ error, resetErrorBoundary }) {
	const navigate = useNavigate();

	const reset = () => {
		resetErrorBoundary();
		navigate('/');
	};

	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={reset}>Try again</button>
		</div>
	);
}

export default ErrorFallback;
