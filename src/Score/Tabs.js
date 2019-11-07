import React from 'react';
import styled from 'styled-components';

const Tabs = ({ active, action, tabs }) => {
	if(tabs.length < 1) return <Tabs />

	return (
		<TabsContainer>{ tabs.map((tab, i) => {
			const value = tab.toLowerCase();
			return (
				<MenuTab
					key={ i }
					className={ active === value && 'active' }
					onClick={ () => action(value) }
				>{ tab }</MenuTab>
			)
		})}</TabsContainer>
	);
};

const TabsContainer = styled.div`
	text-align: left;
`;

const MenuTab = styled.div`
	border-radius: 10px 10px 0 0;
	border: 1px solid #666;
	border-bottom: none;
	display: inline-block;
	padding: 5px 10px;
	background: #CCC;
	cursor: pointer;

	&.active {
		background: #FFF;
	}
`;

export default Tabs;