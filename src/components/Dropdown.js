import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const DropdownContainer = styled.div`
	display: inline-block;
	position: relative;
	padding: 5px 10px;
	background: #FFFFFF;
	border-radius: 3px;
	cursor: pointer;

	.icon {
		text-align: right;
		margin-left: 5px;
	}
`;

const Menu = styled.div`
	position: absolute;
	left:0;
	background: #FFFFFF;
	padding: 5px 0 0 0;
	border-radius: 3px;
	display: none;
	width: fill-available;

	&.visible {
		position: absolute;
		display: block;
	}

	.item:last-child {
		border: none;
	}
`;

const MenuItem = styled.div`
	border-bottom: 1px solid #CCCCCC;
	
	&:hover {
		background: #DDDDDD;
	}

	& > * {
		width: 100%;
		height: 100%;
		padding: 10px;
	}

`;

const Dropdown = props => {
	const [ visible, setVisible ] = useState(false);

	const hideMenu = e => {
		// Wait a tick for propagation to complete
		setTimeout(() => {
			setVisible(false);
		}, 1);
	};

	const toggleMenu = e => {
		if(!visible) {
			setVisible(true);
			document.getElementsByTagName('body')[0].addEventListener('click', hideMenu, { once: true });
		}
	};

	return (
		<DropdownContainer onClick={ toggleMenu }>
			<span>{ props.heading }</span>
			<span className='icon'><Icon icon='sort-down' /></span>
			<Menu className={ visible && 'visible' }>
				{ props.children }
			</Menu>
		</DropdownContainer>
	);
};

// Pass Component as child of default export
Dropdown.Item = props => {
	return (
		<MenuItem className='item'>{ props.children }</MenuItem>	
	);
};

export default Dropdown;