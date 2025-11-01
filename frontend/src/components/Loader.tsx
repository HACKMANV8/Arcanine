import React from 'react';
import '../app/dashboard/loader.css'; // Adjust path as necessary

const Loader: React.FC = () => {
  return (
    <div className="newtons-cradle">
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
    </div>
  );
};

export default Loader;