import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);


  const deleteAllDataFromCart=()=>{
    const userEmailFromLocalStorage = JSON.parse(localStorage.getItem('email'));
    const data={
      email:userEmailFromLocalStorage
    }
      fetch('http://localhost:5066/api/Cart/DeleteAllProductFromCart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
.then((res)=>{return null;})



  }




  const sendPaymentData = async () => {
    try {
      const email = JSON.parse(localStorage.getItem("email"));

      // طلب بيانات الدفع إلى خادمك
      const soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
          <soapenv:Header/>
          <soapenv:Body>
            <tem:SavePaymentData>
              <tem:email>
                <tem:Email>${email}</tem:Email>
              </tem:email>
            </tem:SavePaymentData>
          </soapenv:Body>
        </soapenv:Envelope>
      `;

      const response = await fetch("http://localhost:5066/PaymentService.asmx", {
        method: "POST",
        headers: {
          "Content-Type": "text/xml",
          "SOAPAction": "http://tempuri.org/SavePaymentData",
        },
        body: soapRequest,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log("SOAP Response:", responseText);

      return true; // الدفع ناجح
    } catch (error) {
      console.error("Error during payment:", error);
      setErrorMessage("An error occurred while processing your payment.");
      return false; // الدفع فشل
    }
  };






  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    // إرسال بيانات الدفع إلى الخادم
    const isPaymentSuccessful = await sendPaymentData();
    if (isPaymentSuccessful) {
      deleteAllDataFromCart();
      Swal.fire({
        title: "Success!",
        text: "Thank you for your payment. Your order has been successfully processed and will be delivered within seven days!",
        icon: "success",
      });

      

      navigate("/Home"); // إعادة التوجيه إلى الصفحة الرئيسية
    }
  };





  return (
    <>
      <h2 className="text-center">Payment Process</h2>

      <form onSubmit={handleSubmit} className="container mt-5 pb-5" style={{ width: "60%" }}>
        <PaymentElement />
        <button type="submit" className="btn btn-outline-dark text-center" disabled={!stripe || !elements}>
          Pay
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </>
  );
};

export default Payment;
