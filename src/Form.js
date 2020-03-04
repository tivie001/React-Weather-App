import React from 'react'
import './index.css';
import {Col, FormGroup, Row} from 'react-bootstrap'
import {FormControl} from "react-bootstrap";
import {Button} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

const Form = (props) => {
    return (
        <Row>
            <Col className="d-flex justify-content-center">
                <form onSubmit={props.getWeather}>
                    <FormGroup role="form">
                        <InputGroup className="mb-3">
                            <FormControl type="text" name='zip' placeholder="Zip Code" className="form-control"/>
                            <InputGroup.Append>
                                <Button className="btn btn-primary btn-large" type="submit">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </FormGroup>
                </form>
            </Col>
        </Row>

    )
};

export default Form;