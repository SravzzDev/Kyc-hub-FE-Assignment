import React from 'react';
import { Modal, Table, Button, message } from 'antd';

const AddProduct = ({ visible, onClose, products, comparedProducts, onAddMore }) => {

    const columns = [
        {
          title: 'Image',
          dataIndex: 'thumbnail',
          key: 'thumbnail',
          render: (image) => <img src={image} alt="product" style={{ width: 50, height: 50, objectFit: 'cover' }} />,
        },
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
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Button
              type="primary"
              onClick={() => handleAddMore(record)}
              disabled={comparedProducts.some(p => p.id === record.id) || comparedProducts.length >= 4}
            >
              Add to Compare
            </Button>
          ),
        },
      ];
    
      const handleAddMore = (selectedProduct) => {
        if (comparedProducts.length >= 4) {
          message.warning('You can compare up to 4 products only.');
          return;
        }
        onAddMore(selectedProduct);
        
      };
    
      return (
        <Modal
          title="Add More Products for Comparison"
          open={visible}
          onCancel={onClose}
          footer={null}
          width={850}
        >
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
            scroll={{ y: 400 }}
          />
        </Modal>
      );
    };

export default AddProduct;
