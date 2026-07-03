// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router,Link } from 'react-router-dom'
import Navigation from "./Navigation"
import MenuRouters from "./MenuRouters"
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './css/common.css';
import Monster from "./js/Monster.js"
import 'bootstrap/dist/css/bootstrap.min.css';


const { Header, Content, Footer } = Layout;

const headerStyle = {
  textAlign: 'center',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#343a40',
};

// console.error = (...args) => {
// 	console.log(args)
// }


// GH Pages base path (when deployed to https://user.github.io/repo/frontend/build/)
// Empty string for local dev, "/skellieMonster/frontend/build" for production
const GH_PAGES_BASENAME = (typeof window !== 'undefined' && window.location.hostname.endsWith('.github.io'))
  ? '/skellieMonster/frontend/build'
  : '';

function App() {
  return (
		<Layout className="rpgui-content rpgui-cursor-default">
			<Router basename={GH_PAGES_BASENAME}>
				<Header style={headerStyle}>
					<Navigation>
					</Navigation>
				</Header>
				<Content style={{ minHeight: 'calc(100vh - 64px)' }}>
					<MenuRouters />
				</Content>
			</Router>
		</Layout>
  );
}

export default App;
