import React, { useEffect, useState } from 'react';
import { Layout, Menu, message, Modal, Avatar, Switch, ConfigProvider } from 'antd';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { UserOutlined, FileOutlined, SwapOutlined } from '@ant-design/icons';
import ProductDetails from './pages/product-details/ProductDetails';
import CompareProducts from './pages/compare-products/CompareProducts';
import AddProduct from './components/add-product/AddProduct';
import "./App.css"

const { Header, Content, Sider } = Layout;

const App = () => {
  const [products, setProducts] = useState([]);
  const [comparedProducts, setComparedProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => message.error('Failed to load products'));
  }, []);

  const handleAddToCompare = (product) => {
    if (comparedProducts.length >= 4) {
      message.error('You can only compare up to 4 products.');
      return;
    }
    if (comparedProducts.some(p => p.id === product.id)) {
      message.warning('Product already in comparison.');
      return;
    }

    const updatedComparedProducts = [...comparedProducts, product];
    setComparedProducts(updatedComparedProducts);
    message.success('Product added to comparison.');

    // Automatically navigate to compare page if 2 products are selected
    if (updatedComparedProducts.length === 2) {
      navigate('/compare');
    }
  };

  const handleRemoveFromCompare = (product) => {
    setComparedProducts(comparedProducts.filter(p => p.id !== product.id));
    message.info('Product removed from comparison.');
  };

  const handleCompareNavigation = () => {
    if (comparedProducts.length < 2) {
      Modal.warning({
        title: 'Insufficient Products',
        content: 'You need to select at least 2 products to compare.',
      });
      return;
    }
    navigate('/compare');
  };

  const handleAddMore = (product) => {
    handleAddToCompare(product);
    setIsModalVisible(false);
  };

  const toggleTheme = (checked) => {
    setCurrentTheme(checked ? 'dark' : 'light');
  };

  const themeConfig = {
    token: {
      colorBgContainer: currentTheme === 'dark' ? '#141414' : '#ffffff',
      colorText: currentTheme === 'dark' ? '#ffffff' : '#000000',
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          className="header"
          style={{ background: themeConfig.token.colorBgContainer }}
        >
          <div className='header-title'>Product Comparison App</div>
          <div className='toggle-section'>
            <Switch
              checked={currentTheme === 'dark'}
              onChange={toggleTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
            <Avatar style={{ marginLeft: '16px' }} icon={<UserOutlined />} />
          </div>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme={currentTheme}
            width={200}
          >
            <Menu
              theme={currentTheme}
              mode="inline"
              defaultSelectedKeys={['1']}
              className='menu'
            >
              <Menu.Item key="1" icon={<FileOutlined />} onClick={() => navigate('/')}>
                Products Details
              </Menu.Item>
              <Menu.Item key="2" icon={<SwapOutlined />} onClick={handleCompareNavigation}>
                Compare Products
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className='layout'>
            <Content className='content'>
              <Routes>
                <Route
                  path="/compare"
                  element={
                    <CompareProducts
                      products={comparedProducts}
                      onRemove={handleRemoveFromCompare}
                      onAddMore={() => setIsModalVisible(true)}
                    />
                  }
                />
                <Route
                  path="/"
                  element={
                    <ProductDetails
                      products={products}
                      comparedProducts={comparedProducts}
                      handleAddToCompare={handleAddToCompare}
                    />
                  }
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>

     
        <AddProduct
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          products={products}
          comparedProducts={comparedProducts}
          onAddMore={handleAddMore}
        />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
