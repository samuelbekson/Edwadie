import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Error500: React.FC = () => (
  <div className="container py-24 text-center flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
    <p className="text-2xl mb-6">Oops! Something went wrong on our end.</p>
    <Button asChild size="lg" className="mt-4">
      <Link to="/">Back to Home</Link>
    </Button>
  </div>
);

export default Error500;
