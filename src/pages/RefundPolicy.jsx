import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './RefundPolicy.css'; // Optional for custom styling

const RefundPolicy = () => {
  return (
    <Container className="refund-policy-section mt-2">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="refund-policy-title">Refund Policy</h1>
          <p>Last Updated: September 12, 2024</p>

          <p>
            At <strong>Nayodha</strong>, customer satisfaction is our top priority. We strive to ensure a smooth and seamless experience when using our services. This refund policy outlines the conditions under which refunds will be provided for services purchased on our platform.
          </p>

          <h2>1. Full Refund Guarantee</h2>
          <p>
            If we fail to complete the form-filling process for the service you have purchased within 5 hours due to reasons attributable to <strong>Nayodha</strong>, we will refund 100% of the amount you paid for that form. This guarantee applies only if the delay is caused by us and not due to external factors such as:
          </p>
          <ul>
            <li>Incomplete or incorrect information provided by you</li>
            <li>Technical issues from third-party websites (such as the form submission platform)</li>
            <li>Internet connectivity issues on your side</li>
          </ul>

          <h2>2. Conditions for Refund</h2>
          <p>
            Refunds are applicable only if all of the following conditions are met:
          </p>
          <ul>
            <li>The form filling process is delayed beyond 5 hours due to errors or issues caused by Nayodha.</li>
            <li>You must request the refund within 48 hours of the delay occurring.</li>
            <li>The delay did not occur because of incomplete or incorrect documents or information provided by the user.</li>
          </ul>

          <h2>3. How to Request a Refund</h2>
          <p>
            To request a refund, please contact us at <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a> with your account details, payment information, and the reason for the refund request. Once we receive your request, we will review it and notify you of the status of your refund within 3 business days.
          </p>

          <h2>4. Processing of Refunds</h2>
          <p>
            Approved refunds will be processed within 7-10 business days. The refund will be returned via the original payment method. You will be notified via email when your refund is processed.
          </p>

          <h2>5. Non-Refundable Items</h2>
          <p>
            Refunds do not apply to:
          </p>
          <ul>
            <li>Services that were completed within the given timeframe.</li>
            <li>Incorrect or incomplete submissions caused by user error (e.g., wrong information or documents provided).</li>
            <li>Forms rejected by external authorities or agencies for reasons beyond Nayodha's control.</li>
          </ul>

          <h2>6. Cancellation</h2>
          <p>
            Once a form submission process has been initiated, you may not cancel the service unless it falls under the refund conditions mentioned above. If the form is already submitted or the service is completed, no refund will be granted.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions regarding this refund policy, please contact us at <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default RefundPolicy;
