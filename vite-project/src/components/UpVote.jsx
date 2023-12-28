import React, { useState } from 'react';
import { ethers } from 'ethers';

function UpVote({ contract, account }) {
  const [newsId, setNewsId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpVote = async () => {
    try {
      if (!contract) {
        alert('Contract not available');
        return;
      }

      setLoading(true);

      const id = parseInt(newsId, 10); // Convert the input to an integer
      const transaction = await contract.UpVote(id, {
        value: '10000000000000000', // 0.01 ether
      });

      await transaction.wait();
      alert('UpVote successful!');
    } catch (error) {
      alert(`Error UpVote: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h2>UpVote</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>News ID:</label>
        <input type="number" value={newsId} onChange={(e) => setNewsId(e.target.value)} />
      </div>
      <button onClick={handleUpVote} disabled={loading}>
        {loading ? 'Voting...' : 'UpVote'}
      </button>
    </div>
  );
}

export default UpVote;
