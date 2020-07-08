import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Container, Row, Col, Button} from 'react-bootstrap'

const Store = () => {
    return (
        <>
        <br/>
        <Container>
        <h2>Lista de Lojas</h2>
        <br/>
        <Row>
            <Col md={4}>
                <Button variant="dark">Voltar</Button>
            </Col>
            <Col md={{ span: 4, offset: 3 }}>
                <Button variant="primary">Cadastrar</Button>
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
            </tbody>
            </Table>
            </Row>
        </Container>
        </>
    )
}

export default Store;