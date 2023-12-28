import React, { useState } from 'react';
import { ethers } from 'ethers';

function Evaluate({ contract }) {
  const [loading, setLoading] = useState(false);

  const evaluateNews = async () => {
    try {
      if (!contract) {
        // console.error('Contract not available');
        alert('Contract not available!');
        window.location.reload();
        return;
      }

      setLoading(true);

      const transaction = await contract.evaluate();

      await transaction.wait();
      // console.log('News evaluated successfully!');
      alert('News evaluated successfully!');
      window.location.reload();
    } catch (error) {
      // console.error('Error evaluating news:', error.message);
      alert('Error evaluating news:', error.message);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h2>Evaluate News</h2>
      <button onClick={evaluateNews}>Evaluate News</button>
    </div>
  );
}

export default Evaluate;
