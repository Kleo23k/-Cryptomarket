import React, { useEffect, useState } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, DollarOutlined, ReadOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import logo from "../images/l.png"

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 1200) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleMenuClick = () => {
    if (screenSize <= 1200) {
      setActiveMenu(false);
    }
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
      onClick: handleMenuClick,
    },
    {
      key: 'cryptocurrencies',
      icon: <FundOutlined />,
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
      onClick: handleMenuClick,
    },
    {
      key: 'exchanges',
      icon: <DollarOutlined />,
      label: <Link to="/exchanges">Exchanges</Link>,
      onClick: handleMenuClick,
    },
    {
      key: 'news',
      icon: <ReadOutlined />,
      label: <Link to="/news">News</Link>,
      onClick: handleMenuClick,
    },
  ];

  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar src={logo} size="large" />
        <Typography.Title level={2} className='logo'>
          <Link to="/">CryptoPulse</Link>
        </Typography.Title>
        <Button ghost className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu &&
        <Menu theme='dark' mode="vertical" items={menuItems} />
      }
    </div>
  );
}

export default Navbar;
