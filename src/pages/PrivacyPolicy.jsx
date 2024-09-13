import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './PrivacyPolicy.css'; // Optional for custom styling

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-policy-section mt-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="privacy-policy-title">Privacy Policy</h1>
          <p>Last Updated: September 12, 2024</p>
          <p>
            At <strong>Nayodha</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the website, fill out forms, make a purchase, or contact us for support. The types of information we may collect include:
          </p>
          <ul>
            <li>Name and Contact Data (such as your name, email address, phone number)</li>
            <li>Form-related information (such as exam forms, government schemes you are applying for)</li>
            <li>Payment Data (such as your payment method details to process your transactions)</li>
            <li>Uploaded Documents required for form applications</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect or receive to:
          </p>
          <ul>
            <li>Process your form submissions and handle the related application process</li>
            <li>Manage your payments for forms</li>
            <li>Improve our website and services</li>
            <li>Communicate with you regarding your application status and customer service requests</li>
            <li>Protect against fraudulent activities</li>
          </ul>

          <h2>3. Sharing Your Information</h2>
          <p>
            We do not share, sell, or rent your personal information with third parties except in the following circumstances:
          </p>
          <ul>
            <li>With trusted service providers to process payments and facilitate the form submission process</li>
            <li>When required by law or to comply with legal obligations</li>
            <li>To protect the rights and property of Nayodha, our users, or the public</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We take appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, and misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>5. Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have the right to request access to, correct, or delete your personal information. To make such a request, please contact us at <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a>.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our practices regarding your personal information, please contact us at <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
