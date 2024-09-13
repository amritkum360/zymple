import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUs.css'; // Custom CSS for styling

const AboutUs = () => {
  return (
    <Container className="about-us-section mt-2">
      <Row className="justify-content-center text-center">
        <Col lg={8}>
          <h1 className="about-us-title">About Zymple</h1>
          <p className="about-us-description">
            Welcome to Zymple, your one-stop solution to applying for entrance exam forms, government schemes, and various other official forms without having to visit a cyber cafe! Our platform provides a seamless process for form application, payment, and document submission, making it easier and faster for users to apply for the forms they need.
          </p>
        </Col>
      </Row>

      <Row className="mt-5 text-center">
        <Col md={4}>
          <Image src="team1.jpg" roundedCircle className="team-image" />
          <h3>Our Mission</h3>
          <p>
            To eliminate the need to visit physical centers for form submissions by bringing the service to your fingertips.
          </p>
        </Col>

        <Col md={4}>
          <Image src="team2.jpg" roundedCircle className="team-image" />
          <h3>Our Vision</h3>
          <p>
            To become the leading digital platform for form submissions, serving millions of users across the country.
          </p>
        </Col>

        <Col md={4}>
          <Image src="team3.jpg" roundedCircle className="team-image" />
          <h3>Why Choose Us?</h3>
          <p>
            Fast, reliable, and easy-to-use services that take the hassle out of form filling, payments, and document uploads.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
