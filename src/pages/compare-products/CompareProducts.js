import React from 'react';
import { Table, Button } from 'antd';

const CompareProducts = ({ products, onRemove, onAddMore }) => {
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
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
          render: (price) => `$${price}`,
        },
        {
          title: 'Discount',
          dataIndex: 'discountPercentage',
          key: 'discountPercentage',
          render: (discount) => `${discount}%`,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Button danger onClick={() => onRemove(record)}>Remove</Button>
          ),
        },
      ];
    
      return (
        <div>
          <Table
            columns={columns}
            dataSource={products}
            bordered
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ y: 400 }}
          />
          <Button type="primary" onClick={onAddMore} disabled={products.length >= 4} style={{marginTop:"-15px"}}>
            Add More
          </Button>
        </div>
      );
    };

export default CompareProducts;
