import React from "react";

const PaymentLoader = ({ show }) => {
  if (!show) return null; // Hide if not needed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="loading loading-spinner loading-xl text-primary"></div>
        <p className="mt-4 text-lg font-semibold text-primary">
          Redirecting to payment...
        </p>
      </div>
    </div>
  );
};

export default PaymentLoader;
