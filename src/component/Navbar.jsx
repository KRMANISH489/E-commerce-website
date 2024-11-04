import React, { useEffect, useState } from 'react';
import { Form, Nav, Container, Navbar, NavDropdown, Button } from 'react-bootstrap';
import './index.scss';
import logo from '../image/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import hero1 from '../image/banner/banner1.jpg';
import hero2 from '../image/banner/banner2.jpg';
import hero3 from '../image/banner/banner3.jpg';
import axios from 'axios';

const MainHomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/adminPanel');
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Navbar expand="lg" className="main_class">
                <Container fluid>
                    <div className='logo'>
                        <img src={logo} alt="e-commerce logo" />
                    </div>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 conten_set" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">About</Nav.Link>
                            <NavDropdown title="Products" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#men">Men's</NavDropdown.Item>
                                <NavDropdown.Item href="#women">Women's</NavDropdown.Item>
                                <NavDropdown.Item href="#kid">Kid's</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#">Contact</Nav.Link>
                        </Nav>
                        <div className="search-container">
                            <Form className="d-flex">
                                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </div>
                        <div className='icon-section'>
                            <a href="http://localhost:3000/LoginDashbord" className="FontAwesome_Icon">
                                <FontAwesomeIcon icon={faUser} />
                                <p>Profile</p>
                            </a>

                            <div className="FontAwesome_Icon" href="#">
                                <FontAwesomeIcon icon={faHeart} />
                                <p>Wishlist</p>
                            </div>
                            <div className="FontAwesome_Icon">
                                <FontAwesomeIcon icon={faBagShopping} />
                                <p>Cart</p>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Banner */}
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                loop={true}
                autoplay={{ delay: 3000 }}
                spaceBetween={10}
            >
                <SwiperSlide>
                    <img className='banner' src={hero1} alt="banner img" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='banner' src={hero2} alt="banner img" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='banner' src={hero3} alt="banner img" />
                </SwiperSlide>
            </Swiper>

            {/* Product Section */}
            <section>
                <div className="container">
                    <h2>Featured Products</h2>
                    <div className="row">
                        {products.map(product => (
                            <div key={product.id} className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div className="product-card">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>Price: ₹ {(parseFloat(product.price) || 0).toFixed(2)}</p>
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    );
};

export default MainHomePage;
