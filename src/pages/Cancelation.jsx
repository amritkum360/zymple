import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CancellationPolicy.css'; // Optional for custom styling

const CancellationPolicy = () => {
  return (
    <Container className="cancellation-policy-section mt-2">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="cancellation-policy-title">Cancellation Policy</h1>
          <p>Last Updated: September 12, 2024</p>

          <p>
            At <strong>Nayodha</strong>, we understand that unforeseen circumstances may arise, and you may want to cancel or pause the processing of your form after making a payment. Below is our cancellation policy, outlining how you can pause the service but not request a refund after payment.
          </p>

          <h2>1. No Refund After Payment</h2>
          <p>
            Once the payment is successfully made for the form-filling service, the request cannot be refunded. Our team immediately begins processing the forms to ensure timely and accurate submission on your behalf.
          </p>
          <p>
            By making a payment, you agree to this condition and acknowledge that you will not be eligible for a refund, except in cases where the service is not completed due to a fault on our end as described in our <a href="/refund-policy">Refund Policy</a>.
          </p>

          <h2>2. Pausing the Service</h2>
          <p>
            While a refund cannot be processed after payment, you do have the option to pause the service. Pausing allows you to temporarily stop the form submission process. To pause the service:
          </p>
          <ul>
            <li>Send a request to pause the service by contacting our support team at <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a>.</li>
            <li>Your service will be paused for up to 48 hours from the time of request.</li>
            <li>After 48 hours, the service will automatically resume unless you extend the pause by contacting us again.</li>
          </ul>

          <h2>3. Conditions for Pausing the Service</h2>
          <p>
            Pausing the service is allowed under the following conditions:
          </p>
          <ul>
            <li>The request to pause is made before the form is submitted on your behalf.</li>
            <li>You provide all necessary information and documents before pausing the service.</li>
            <li>There are no outstanding issues or disputes regarding your payment or account.</li>
          </ul>

          <h2>4. Resuming the Service</h2>
          <p>
            If you decide to resume the form processing after pausing it, simply contact our support team at <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a> to restart the process. We will continue processing your form from where it was left off.
          </p>
          <p>
            Please note that extended delays caused by pausing the service may impact the timely submission of your form. Nayodha is not responsible for any missed deadlines or form rejections due to extended pausing periods.
          </p>

          <h2>5. Cancellation Exceptions</h2>
          <p>
            In rare cases, if Nayodha is unable to fulfill the service due to internal reasons, you may be eligible for a refund under our <a href="/refund-policy">Refund Policy</a>. This is only applicable if the delay or cancellation is caused by Nayodha and not external factors.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this cancellation policy or need assistance with pausing or resuming your service, please contact us at <a href="mailto:amritkum360@gmail.com">amritkum360@gmail.com</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default CancellationPolicy;
