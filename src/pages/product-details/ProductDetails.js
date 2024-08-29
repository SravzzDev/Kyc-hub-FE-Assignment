import React, { useState } from 'react';
import { Table, Button } from 'antd';

const ProductDetails = ({ products, handleAddToCompare, comparedProducts }) => {
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (image) => (
        <img
          src={image}
          alt="product"
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title), 
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price, 
      render: (price) => `$${price}`,
    },
    {
      title: 'Discount',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      sorter: (a, b) => a.discountPercentage - b.discountPercentage, 
      render: (discount) => `${discount}%`,
    },
    {
      title: 'Compare Products',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleAddToCompare(record)}
          disabled={
            comparedProducts.length >= 4 ||
            comparedProducts.some((p) => p.id === record.id)
          }
        >
          Compare
        </Button>
      ),
    },
  ];

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey="id"
      pagination={{
        pageSize,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        onShowSizeChange: handlePageSizeChange,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
      bordered
      scroll={{ y: 480 }}
    />
  );
};

export default ProductDetails;
