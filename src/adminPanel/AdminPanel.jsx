import React, { useState, useEffect } from "react";
import "../adminPanel/AdminPanel.scss";
import axios from 'axios';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image: "" });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/adminPanel')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const addProduct = () => {
        if (editIndex !== null) {
            axios.put(`http://localhost:3001/adminPanel/${products[editIndex].id}`, newProduct)
                .then(response => {
                    const updatedProducts = [...products];
                    updatedProducts[editIndex] = response.data;
                    setProducts(updatedProducts);
                    setEditIndex(null);
                    setNewProduct({ name: "", price: "", description: "", image: "" });
                })
                .catch(error => {
                    console.error('There was an error updating the product!', error);
                });
        } else {
            axios.post('http://localhost:3001/adminPanel', newProduct)
                .then(response => {
                 
                    setProducts([response.data, ...products]);
                    setNewProduct({ name: "", price: "", description: "", image: "" });
                })
                .catch(error => {
                    console.error('There was an error adding the product!', error);
                });
        }
    };
    

    const editProduct = (index) => {
        setEditIndex(index);
        setNewProduct(products[index]);
    };

    const deleteProduct = (index) => {
        axios.delete(`http://localhost:3001/adminPanel/${products[index].id}`)
            .then(() => {
                setProducts(products.filter((_, i) => i !== index));
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} />
            <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
            <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleChange} />

            <button onClick={addProduct}>
                {editIndex !== null ? "Update Product" : "Add Product"}
            </button>

            <table>
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id || index}>
                            <td>{index + 1}</td>
                            <td> {product.image ? <img src={product.image} alt={product.name} width="50" /> : "N/A"}  </td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button onClick={() => editProduct(index)}>Edit</button>
                                <button onClick={() => deleteProduct(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
