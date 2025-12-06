import React from 'react';
import { useNavigate } from 'react-router';

const Action = () => {
    const navigate = useNavigate();
    return (
      <section className="py-12 px-4 bg-primary">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Share your passion — become a chef
            </h3>
            <p className="text-neutral mt-2">
              Earn from your kitchen and reach hungry customers in your area.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/register")}
              className="btn btn-secondary"
            >
              Apply to be a chef
            </button>
            <button
              onClick={() => navigate("/meals")}
              className="btn btn-accent text-white"
            >
              Browse Meals
            </button>
          </div>
        </div>
      </section>
    );
};

export default Action;