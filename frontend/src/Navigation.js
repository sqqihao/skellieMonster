// [F13 修复] 所有 Link 加 PUBLIC_URL 前缀，部署到 GH Pages 子路径时路由不会 404。
// [Nav-C] 移动端汉堡菜单：< 768px 时 nav links 折叠到抽屉里，避免 8 个 tab 挤成 3 行
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './css/nav.css';
import logo from "./sprites/favicon-32x32.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const PREFIX = process.env.PUBLIC_URL || '';
const navItems = [
  { to: '/Monster',    label: 'Monster' },
  { to: '/MyShop',     label: 'My Shop' },
  { to: '/Breed',      label: 'Breed' },
  { to: '/Trade',      label: 'Trade' },
  { to: '/Dojo',       label: 'Dojo' },
  { to: '/Share',      label: 'Share' },
  { to: '/ShareToMe',  label: 'ShareToMe' },
  { to: '/NFT',        label: 'NFT' },
];

function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const close = () => setOpen(false);

  return (
    <div className="skellie-nav">
      <img src={logo} alt="logo" className="skellie-logo" />

      {/* Desktop: 横向 nav links */}
      <nav className="skellie-nav-links">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={`${PREFIX}${item.to}`}
            className={`skellie-nav-link ${location.pathname === `${PREFIX}${item.to}` ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="skellie-nav-wallet">
        <ConnectButton accountStatus={{ smallScreen: 'avatar' }} />
      </div>

      {/* Mobile: 汉堡按钮（仅 <768px 显示） */}
      <Button
        className="skellie-nav-burger"
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      />

      {/* Mobile: 抽屉式菜单 */}
      <Drawer
        title={
          <div className="skellie-drawer-header">
            <img src={logo} alt="logo" className="skellie-drawer-logo" />
            <span>Skellie Monster</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={close}
              aria-label="Close menu"
            />
          </div>
        }
        placement="right"
        onClose={close}
        open={open}
        width="78vw"
        className="skellie-drawer"
        styles={{ body: { padding: 0, background: '#1c1d20' } }}
        headerStyle={{ background: '#1c1d20', borderBottom: '1px solid #333' }}
      >
        <ul className="skellie-drawer-list">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={`${PREFIX}${item.to}`}
                className={`skellie-drawer-link ${location.pathname === `${PREFIX}${item.to}` ? 'active' : ''}`}
                onClick={close}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="skellie-drawer-wallet">
          <ConnectButton />
        </div>
      </Drawer>
    </div>
  );
}

export default Navigation;
