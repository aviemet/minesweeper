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

	const doNavigation = () => {
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