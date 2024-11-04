// import { Breadcrumb, Layout, Menu, theme ,Tag} from 'antd';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import 'antd/dist/antd.min.css'; // Ant Design 5
import './css/nav.css';
import logo from  "./sprites/favicon-32x32.png"

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
				
				<button class="rpgui-button golden" type="button"><p>Click me golden!</p></button>
			</div>
		</div>
	)
}

export default Navigation;