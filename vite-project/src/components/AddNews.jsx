import React, { useState } from 'react';
import { ethers } from 'ethers';

function AddNews({ contract, account }) {
  const [agencyName, setAgencyName] = useState('');
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');

  const addNews = async () => {
    try {
      if (!contract) {
        // console.error('Contract not available');
        alert('Contract not available');
        window.location.reload();
        return;
      }

      const agencyAddress = agencyName;

      const transaction = await contract.addNews(agencyAddress, title, article, {
        value: '10000000000000000',//removed 2 zeros
      });

      await transaction.wait();
      // console.log('News added successfully!');
      alert('News added successfully!');
      window.location.reload();

    } catch (error) {
      // console.error('Error adding news:', error.message);
      alert(error.message);
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h2>Add News</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>
          Agency Name (Address):
        </label>
        <input type="text" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '48px' }}>
          Title:
        </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '38px' }}>
          Article:
        </label>
        <textarea value={article} onChange={(e) => setArticle(e.target.value)} />
      </div>
      <button onClick={addNews}>Add News</button>
    </div>
  );
}

export default AddNews;
