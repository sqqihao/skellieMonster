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


function App() {
  return (
		<Layout className="rpgui-content rpgui-cursor-default">
			<Router>
				<Header style={headerStyle}>
					<Navigation>
					</Navigation>
				</Header>
				<MenuRouters />
			</Router>
		</Layout>
  );
}

export default App;
