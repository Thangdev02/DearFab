import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Tabs, Tab, Table } from "react-bootstrap";
import { getProductById, updateProduct, updateProductSize } from "../../services/api";

function EditProductModal({ show, onHide, productId }) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    image: "", // string link ảnh từ API
  });
  const [imageFile, setImageFile] = useState(null); // file upload
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (show && productId) {
      fetchProduct();
    }
  }, [show, productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      setProductInfo({
        name: data.name || "",
        description: data.description || "",
        image: data.image || "",
      });
      setSizes(data.productSizes || []);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Không thể tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Hiển thị preview bằng URL tạm
      setProductInfo((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSaveInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productInfo.name);
      formData.append("description", productInfo.description);
      if (imageFile) {
        formData.append("imageFile", imageFile); // API cần field gì thì đổi tên ở đây
      }

      await updateProduct(productId, formData);
      alert("Cập nhật thông tin sản phẩm thành công");
      fetchProduct();
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại");
    }
  };

  const handleSaveSize = async (sizeId, price, quantity) => {
    try {
      await updateProductSize(sizeId, price, quantity);
      alert("Cập nhật size thành công");
      fetchProduct();
    } catch (err) {
      console.error(err);
      alert("Cập nhật size thất bại");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh Sửa Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          {/* Tab 1: Thông tin */}
          <Tab eventKey="info" title="Thông tin">
            <Form className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  value={productInfo.name}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={productInfo.description}
                  onChange={(e) =>
                    setProductInfo({
                      ...productInfo,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
                {productInfo.image && (
                  <img
                    src={productInfo.image}
                    alt="preview"
                    style={{
                      marginTop: 10,
                      width: 150,
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}
              </Form.Group>

              <Button variant="primary" onClick={handleSaveInfo}>
                Lưu thông tin
              </Button>
            </Form>
          </Tab>

          {/* Tab 2: Size */}
          <Tab eventKey="sizes" title="Quản lý size">
            <Table striped bordered hover size="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.id}>
                    <td>{s.size}</td>
                    <td>
                      <Form.Control
                        type="number"
                        defaultValue={s.price}
                        onChange={(e) => (s.price = e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        defaultValue={s.quantity}
                        onChange={(e) => (s.quantity = e.target.value)}
                      />
                    </td>
                    <td>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleSaveSize(s.id, s.price, s.quantity)
                        }
                      >
                        Lưu
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProductModal;
