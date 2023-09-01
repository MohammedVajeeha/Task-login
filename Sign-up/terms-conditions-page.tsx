import React from 'react';
import './sign-up.css';



interface Props {

  onClose: () => void;

}



const TermsModal: React.FC<Props> = ({ onClose }) => {

  return (

    <div className="terms-modal">

      <div className="terms-content">

        <h2>Terms and Conditions</h2>

        <p>
          <ul>

            <li>

              <strong>Confidentiality and Data Security:</strong>

              <ul>

                <li>Employees should sign a confidentiality agreement.</li>

                <li>Limit access to sensitive information only to necessary employees.</li>

                <li>Use strong passwords and implement 2FA.</li>

                <li>Encrypt sensitive data during storage and transmission.</li>

                <li>Regularly update and patch software systems.</li>

              </ul>

            </li>



            <li>

              <strong>Access Control:</strong>

              <ul>

                <li>Implement role-based access control (RBAC).</li>

                <li>Regularly review and update access permissions.</li>

              </ul>

            </li>

            <li>

              <strong>Remote Work and Mobile Devices:</strong>

              <ul>

                <li>Follow security protocols for remote work.</li>

                <li>Implement mobile device management (MDM) policies.</li>

              </ul>

            </li>





            <li>

              <strong>Secure Communication:</strong>

              <ul>

                <li>Use encrypted communication tools for sensitive discussions.</li>

                <li>Avoid discussing confidential matters in public or unsecured channels.</li>

              </ul>

            </li>

            <li>

              <strong>Intellectual Property Protection:</strong>

              <ul>

                <li>Protect organization's intellectual property.</li>

                <li>Define ownership of intellectual property developed by employees.</li>

              </ul>

            </li>




            <li>

              <strong>Clear Desk and Screen Policy:</strong>

              <ul>

                <li>Encourage clean workspaces and minimize sensitive documents.</li>

                <li>Implement clear desk and screen policies.</li>

              </ul>

            </li>

          </ul>
        </p>
        <div className='close-button-tc'>
          <button onClick={onClose}>Close</button>
        </div>
      </div>

    </div>

  );

};



export default TermsModal;