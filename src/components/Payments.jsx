import React, { useEffect, useState } from 'react';
import { fetchPayments } from '../api/paymentApi';
import Card from './Card';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      const data = await fetchPayments();
      setPayments(data);
    };

    loadPayments();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {payments.map((payment) => (
        <Card key={payment._id}>
          <h3 className="text-xl font-bold">Payment ID: {payment._id}</h3>
          <p>Amount: ${payment.amount}</p>
          <p>Status: {payment.status}</p>
          <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
        </Card>
      ))}
    </div>
  );
};

export default Payments;
