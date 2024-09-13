import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ContactUs.css'; // Optional for custom styling

const ContactUs = () => {
  return (
    <Container className="contact-us-section mt-2">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="contact-us-title">Contact Us</h1>
          <p>If you have any questions, concerns, or need assistance, feel free to reach out to us. We’re here to help!</p>

          <h2>Company Information</h2>
          <ul className="contact-info">
            <li><strong>Company Name:</strong> Amrit Kumar</li>
            <li><strong>Address:</strong> 1234 Main Street, Suite 100, City, State, ZIP Code</li>
            <li><strong>Mobile Number:</strong> +91 98765 43210</li>
            <li><strong>Email:</strong> <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a></li>
          </ul>

          <h2>Send Us a Message</h2>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Your message here" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
