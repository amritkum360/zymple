import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './TermsAndConditions.css'; // Optional for custom styling

const TermsAndConditions = () => {
  return (
    <Container className="terms-and-conditions-section mt-2">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="terms-title">Terms and Conditions</h1>
          <p>Last Updated: September 12, 2024</p>

          <p>
            Welcome to <strong>Nayodha</strong>. These terms and conditions outline the rules and regulations for the use of our website, located at <strong>www.Nayodha.com</strong>.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions. If you do not agree to all the terms and conditions, do not continue to use Nayodha.
          </p>

          <h2>2. Services Offered</h2>
          <p>
          Nayodha provides users with the ability to apply for various forms, including entrance exam forms and government schemes. The platform also allows users to make payments and submit required documents electronically.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To use our services, users are required to create an account. You agree to provide accurate, complete, and updated information for your account. You are responsible for maintaining the confidentiality of your account login details.
          </p>

          <h2>4. Payments</h2>
          <p>
            Payments for the forms you apply for on Nayodha are processed through third-party payment gateways. Nayodha is not responsible for any issues arising during the payment process. Ensure you review the terms of the payment processor before completing any transaction.
          </p>

          <h2>5. Submission of Documents</h2>
          <p>
            Users are responsible for submitting accurate and valid documents during the form application process. Nayodha takes no responsibility for the rejection of applications due to inaccurate or incomplete documentation.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website, including logos, graphics, and text, is the intellectual property of Nayodha unless otherwise stated. You may not reproduce, distribute, or otherwise use any content without prior written permission.
          </p>

          <h2>7. Prohibited Activities</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use the website in any way that could damage or interfere with the website or the experience of other users.</li>
            <li>Submit false or misleading information.</li>
            <li>Attempt to gain unauthorized access to other users' accounts.</li>
          </ul>

          <h2>8. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to the website without prior notice if we determine that you have violated any of these terms and conditions.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
          Nayodha is not liable for any direct, indirect, incidental, or consequential damages that may arise from the use or inability to use our services, even if we have been advised of the possibility of such damages.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising out of or related to these terms will be resolved in the courts of [Your Country/State].
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
          Nayodha reserves the right to update or modify these terms at any time without prior notice. Your continued use of the website following any changes indicates your acceptance of the new terms.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these terms, please contact us at <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
