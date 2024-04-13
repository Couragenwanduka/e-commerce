import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f4f4f4',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        width: '400px',
        maxWidth: '90%',
        textAlign: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

const SHOWALLPRODUCTS = ({ products: initialProducts }) => {
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cookies] = useCookies(['token']);
    const [modalProduct, setModalProduct] = useState(null);
    const [productModel, setProductModel] = useState(false);
    const [addToCartMessage, setAddToCartMessage] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = cookies.token;
                const response = await axios.get('http://localhost:5740/getAllProducts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.error) {
                    setErrorMessage(response.data.error);
                    setSuccessMessage('');
                } else {
                    const shuffledProducts = response.data.products.map(product => ({
                        ...product,
                        imageUrl: shuffleArray(product.imageUrl)
                    }));

                    setFetchedProducts(shuffledProducts);
                    setErrorMessage('');
                    setSuccessMessage(response.data.message);
                }
            } catch (error) {
                setErrorMessage(error.response.data.message);
                setSuccessMessage('');
                setIsOpen(false);
            }
        };

        fetchData();
    }, [cookies.token]);

    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    };

    const openModal = (product) => {
        setModalProduct(product);
        setProductModel(true);
    };
    
    const handleSubmit = async () => {
        try {
           
            const token = cookies.token;
            // console.log(modalProduct._id, quantity,modalProduct.price)
            const response = await axios.post('http://localhost:5740/addToCart', {
                productId: modalProduct._id,
                quantity: quantities[modalProduct._id] || 1,
                price: modalProduct.price,
                imageUrl: modalProduct.imageUrl,
                name: modalProduct.name
            }, 
            
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
           setAddToCartMessage(response.data.message)
           setTimeout(()=>{
            if(response.status==200){
             window.location.reload();
            }
           },3000)
        } catch (error) {
            setAddToCartMessage('Error adding product to cart');
        }
    };
    const [quantities, setQuantities] = useState({});

    // Function to handle increasing quantity
    const increaseQuantity = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 0) + 1
        }));
    };

    // Function to handle decreasing quantity
    const decreaseQuantity = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0)
        }));
    };
    return (
        <>
            {/* Conditionally render products based on whether props are available */}
            {initialProducts && initialProducts.length > 0 ? (
                <div className='product-container'>
                    {initialProducts.map(product => (
                        <div key={product._id} className='product-card' onClick={() => openModal(product)}>
                            <img src={shuffleArray(product.imageUrl)[0]} alt={product.name} className='product-image' />
                            <div className='product-details'>
                                <p className='product-name'>{product.name}</p>
                                <p className='product-price'>${product.price}</p>
                            </div>
                            <button className="add-to-cart-button">Add to Cart</button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='product-container'>
                    {fetchedProducts.map(product => (
                        <div key={product._id} className='product-card' onClick={() => openModal(product)}>
                            <img src={shuffleArray(product.imageUrl)[0]} alt={product.name} className='product-image' />
                            <div className='product-details'>
                                <p className='product-name'>{product.name}</p>
                                <p className='product-price'>${product.price}</p>
                            </div>
                            <button className="add-to-cart-button">Add to Cart</button>
                        </div>
                    ))}
                </div>
            )}
            <Modal
                isOpen={productModel}
                onRequestClose={() => {setProductModel(false);
                setAddToCartMessage('');
            }}
                contentLabel="Product Details Modal"
                ariaHideApp={false}
                className="modal-content"
            >
                <div className='modal-container'>
                    <button onClick={() => setProductModel(false)} className="close-button">Close</button>
                    {modalProduct && (
                        <div className='product-details'>
                            <h2 className='product-name'>{modalProduct.name}</h2>
                            <p className='product-description'>{modalProduct.description}</p>
                            <p className='product-price'>${modalProduct.price}</p>
                            <div className='image-container'>
                                {modalProduct.imageUrl.map((url, index) => (
                                    <img key={index} src={url} alt={`Product ${index + 1}`} className='product-image' />
                                ))}
                            </div>
                            <div className='quantity-controls'>
                                <button className="quantity-btn" onClick={(e) => { e.stopPropagation(); decreaseQuantity(modalProduct._id); }}>-</button>
                                <span>{quantities[modalProduct._id] || 0}</span>
                                <button className="quantity-btn" onClick={(e) => { e.stopPropagation(); increaseQuantity(modalProduct._id); }}>+</button>
                            </div>

                            <button className="add-to-cart-button" onClick={handleSubmit}>Add to Cart</button>
                            {addToCartMessage&&<div className=" text-black p-2 rounded-md">{addToCartMessage}</div>}
                        </div>
                    )}
                </div>
            </Modal>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div>
                    <button onClick={() => setIsOpen(false)} className="bg-black text-base text-white font-medium">Close</button>
                    {successMessage && <div className="text-black text-5xl font-sans font-medium">{successMessage}</div>}
                    {errorMessage && <div className="text-black text-5xl font-sans font-medium">{errorMessage}</div>}
                </div>
            </Modal>
        </>
    );
};

export default SHOWALLPRODUCTS;
