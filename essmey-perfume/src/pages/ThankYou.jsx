import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-20 min-h-[60vh] flex flex-col items-center">
      <h2 className="text-3xl font-serif font-bold mb-4">
        Thank You for Your Order!
      </h2>
      <p className="mb-6">
        You'll receive order updates via email/SMS (demo only).
      </p>
      <button className="btn-primary" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default ThankYou;
