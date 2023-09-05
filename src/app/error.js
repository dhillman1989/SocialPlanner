"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="center-flex-col error-page-message">
      <h2>Something went wrong!</h2>
      <button className="button button--secondary" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
