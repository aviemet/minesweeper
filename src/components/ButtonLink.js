import React from 'react';
import { useRoutes } from '../context/RouteStore';
import styled from 'styled-components';

const Link = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
`;

const ButtonLink = ({ to, children, ...rest }) => {
	const { routeDispatcher } = useRoutes();

	const doNavigation = e => {
		// Prevent clicking the link from being captured by board reset event listener
		e.stopPropagation();

		routeDispatcher({
			type: 'navigate',
			page: to,
		});
	};

	return (
		<Link onClick={ doNavigation } { ...rest }>{ children }</Link>
	);
};

export default ButtonLink;