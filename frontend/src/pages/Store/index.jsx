import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Container, Row, Col, Button, Modal, Form} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import {FiEdit2, FiTrash2, FiArrowLeft, FiPlus} from 'react-icons/fi';
import storeService from '../../services/storeService'

const Store = () => {
    const history = useHistory();
    const [stores, setStores] = useState([])
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [store, setStore] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);

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
        storeService.delete(id).then(resp => {
            console.log(resp)
        }).catch(e => {
            console.log(e)
        })
        history.go(0);
    }

    const preUpdate = (store) => {
        setStore(store);
        setIsUpdate(true);
        handleShow();
    }

    const handleSubmit = () => {
        const store = {
            name,
            description,
            address,
            city,
            uf
        }

        let validate = Object.values(store).filter(value => {
            return !!value
        })

        if(validate.length === 5) {
            storeService.create(store).then(resp => {
                console.log(resp)
            }).catch(e => {
                console.log(e)
            })
            history.go(0)
        }else{
            alert("Todos os campos devem ser prenchidos")
        }
        
    }

    const handleUpdate = () => {
        const newStore = {
            name: name ? name : store.name,
            description: description ? description : store.description,
            address: address ? address : store.address,
            city: city ? city : store.city,
            uf: uf ? uf : store.uf
        }
        
        storeService.update(store.id, newStore).then(resp => {
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
                <h2>Lista de Lojas</h2>
            </Col>
            <Col md={1}>
                <Link to="/products">
                    <Button variant="link" onClick={handleShow}>
                        Produtos
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
                <th>Endereço</th>
                <th>Cidade</th>
                <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    stores.map(store => {
                        return (
                        <tr key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.description}</td>
                            <td>{store.address}</td>
                            <td>{store.city}/{store.uf}</td>
                            <td>
                                <Button className="mr-2" onClick={() => preUpdate(store)} variant="warning"><FiEdit2/></Button>
                                <Button variant="danger" onClick={() => handleDelete(store.id)}><FiTrash2/></Button>
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
            <Modal.Title>{isUpdate ? 'Atualização' : 'Cadastro'} de Loja</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder={isUpdate ? store.name : 'Digite o nome da Loja'} onChange={e => setName(e.target.value)} type="text" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control placeholder={isUpdate ? store.description : 'Uma breve descrição'} onChange={e => setDescription(e.target.value)} type="text" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control  placeholder={isUpdate ? store.address : 'Ex: Rua X, 123'} onChange={e => setAddress(e.target.value)} type="text" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type="text" placeholder={isUpdate ? store.city : 'Digite Aqui'} onChange={e => setCity(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>UF</Form.Label>
                    <Form.Control type="text" placeholder={isUpdate ? store.uf : 'Ex: CE'} onChange={e => setUf(e.target.value)} maxLength={2} />
                    </Form.Group>
                </Form.Row>


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

export default Store;