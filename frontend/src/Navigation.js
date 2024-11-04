// import { Breadcrumb, Layout, Menu, theme ,Tag} from 'antd';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import 'antd/dist/antd.min.css'; // Ant Design 5
import './css/nav.css';
import logo from  "./sprites/favicon-32x32.png"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletButton } from '@rainbow-me/rainbowkit';


function Navigation(){
	return (
		<div>
			<div className="logo-item">
				<img src={logo} />
				&nbsp;&nbsp;&nbsp;
				<Link to="/Monster">Monster</Link>
				&nbsp;&nbsp;&nbsp;
				<Link to="/MyShop">My Shop</Link>
				&nbsp;&nbsp;&nbsp;
				<Link to="/Breed">Breed</Link>
				&nbsp;&nbsp;&nbsp;
				<Link to="/Trade">Trade</Link>
				&nbsp;&nbsp;&nbsp;
				<Link to="/Dojo">Dojo</Link>
				&nbsp;&nbsp;&nbsp;
				<Link to="/Share">Share</Link>
				&nbsp;&nbsp;&nbsp;
				<Link to="/ShareToMe">ShareToMe</Link>
				&nbsp;&nbsp;&nbsp;
				<Link to="/NFT">NFT</Link>
				&nbsp;&nbsp;&nbsp;
				
				<div class="navwallet">

					<ConnectButton
					  accountStatus={{
					    smallScreen: 'avatar'
					  }} />

					  
				</div>
			</div>
		</div>
	)
}

export default Navigation;