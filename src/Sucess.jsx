import React, { useState, useEffect } from 'react';
import './Login.css';
import Container from 'react-bootstrap/Container';
import { CheckCircle } from 'react-bootstrap-icons';
import './Success.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Success = () => {
    return (
        <Container style={{ marginTop: "5rem" }}>

            <Card style={{ marginLeft: "25%", marginRight: "25%" }}>
                <Card.Header style={{ textalign: "center" }}>Success!</Card.Header>
                <Card.Body>
                    <div className='icon'>
                        <CheckCircle color="green" size={60} />
                    </div>
                    <Card.Text style={{ textAlign: "center", paddingTop: "2rem" }}>
                        Thank you for your purchase!
                    </Card.Text>
                </Card.Body>
            </Card>

        </Container>
    );
};

export default Success;