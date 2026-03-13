import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import giraffe1 from '../../assets/giraffe1.jpg';
import giraffe2 from '../../assets/giraffe2.jpg';
import giraffe3 from '../../assets/giraffe3.jpg';

export default function Giraffe() {
  return (
    < div >
      <h1>Giraffe</h1>
      < Container >
        <Row>
          <Col sm={12} md={4}>
            <Image className="img-fluid" src={giraffe1} rounded style={{maxHeight: '300px', objectFit: 'cover'}} />
          </Col>
          <Col sm={12} md={4}>
            <Image className="img-fluid" src={giraffe2} roundedCircle style={{maxHeight: '300px', objectFit: 'cover'}} />
          </Col>
          <Col sm={12} md={4}>
            <Image className="img-fluid" src={giraffe3} thumbnail style={{maxHeight: '300px', objectFit: 'cover'}} />
          </Col>
        </Row>
      </Container >
    </div >
  )

}
