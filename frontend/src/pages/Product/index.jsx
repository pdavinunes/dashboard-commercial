import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Container, Row, Col, Button, Modal, Form} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import {FiEdit2, FiTrash2, FiArrowLeft, FiPlus} from 'react-icons/fi';
import productService from '../../services/productService';
import storeService from '../../services/storeService'

const Product = () => {
    const history = useHistory();
    const [products, setProducts] = useState([])
    const [stores, setStores] = useState([])
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [store_id, setStoreId] = useState('');
    const [comments, setComments] = useState('');
    const [product, setProduct] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        productService.index().then(resp => {
            const currentProducts = resp.data.products;
            setProducts(currentProducts);
        });
    }, [])

    useEffect(() => {
        storeService.index().then(resp => {
            const currentStores = resp.data.stores;
            setStores(currentStores);
        });
    }, [])
    const handleClose = () => {
        setShow(false);
        setIsUpdate(false);
    };
    const handleShow = () => setShow(true);
    const handleDelete = (id) => {
        productService.delete(id).then(resp => {
            console.log(resp)
        }).catch(e => {
            console.log(e)
        })
        history.go(0);
    }

    const preUpdate = (product) => {
        setProduct(product);
        setIsUpdate(true);
        handleShow();
    }

    const handleSubmit = () => {
        let product = {
            name,
            description,
            price,
            store_id,
        }

        let validate = Object.values(product).filter(value => {
            return !!value
        })

        if(validate.length === 4) {
            product = {...product, comments}
            productService.create(product).then(resp => {
                console.log(resp)
            }).catch(e => {
                console.log(e)
            })
            history.go(0)
        }else{
            alert("Todos os campos devem ser prenchidos")
        }
        
    }

    const handleSelectedStoreId = (event) => {
        const storeId = event.target.value;
        setStoreId(storeId);
    }

    const handleUpdate = () => {
        const newProduct = {
            name: name ? name : product.name,
            description: description ? description : product.description,
            price: price ? price : product.price,
            store_id: store_id ? store_id : product.store_id,
            comments: comments ? comments : product.comments,
        }
        
        productService.update(product.id, newProduct).then(resp => {
            console.log(resp)
        }).catch(e => {
            console.log(e)
        })
        
        history.go(0)
    }

    return (
        <>
        <br/>
        <Container>
            <Row>
            <Col md={1}>
                <Link to="/">
                    <FiArrowLeft size={36}/>
                </Link>
            </Col>
            <Col md={8}>
                <h2>Lista de Produtos</h2>
            </Col>
            <Col md={1}>
                <Link to="/stores">
                    <Button variant="link" onClick={handleShow}>
                        Lojas
                    </Button>
                </Link>
            </Col>
            <Col md={2}>
                <Button variant="primary" onClick={handleShow}>
                    Cadastrar <FiPlus/>
                </Button>
            </Col>
            </Row>
        <br/>
        <Row>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Loja</th>
                <th>Preço</th>
                <th>Observações</th>
                <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(product => {
                        return (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.store_name}</td>
                            <td>R$ {product.price}</td>
                            <td>{product.comments}</td>
                            <td>
                                <Button className="mr-2" onClick={() => preUpdate(product)} variant="warning"><FiEdit2/></Button>
                                <Button variant="danger" onClick={() => handleDelete(product.id)}><FiTrash2/></Button>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
            </Table>
            </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{isUpdate ? 'Atualização' : 'Cadastro'} de Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder={isUpdate ? product.name : 'Digite o nome do Produto'} onChange={e => setName(e.target.value)} type="text" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control placeholder={isUpdate ? product.description : 'Uma breve descrição'} onChange={e => setDescription(e.target.value)} type="text" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control  placeholder={isUpdate ? product.price : '10.00'} onChange={e => setPrice(e.target.value)} type="number" step={.01} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Loja</Form.Label>
                    <Form.Control as="select" onChange={handleSelectedStoreId} >
                        <option key={0} value={0}>Selecione uma loja</option>
                        {stores.map(store => {
                            return (<option key={store.id} value={store.id}>{store.name}</option>)
                        })}
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Observações</Form.Label>
                    <Form.Control  placeholder={isUpdate ? product.comments : 'Obs: (Opcional)'} onChange={e => setComments(e.target.value)} type="text" />
                </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
            <Button variant="primary" onClick={isUpdate ? handleUpdate : handleSubmit}>
                {isUpdate ? 'Atualizar':'Cadastrar'}
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Product;