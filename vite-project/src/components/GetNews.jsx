import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function GetNews({ contract }) {
  const [allNews, setAllNews] = useState([]);

  const fetchAllNews = async () => {
    try {
      if (!contract) {
        alert('Contract not available');
        return;
      }

      const allNewsArray = await contract.getAllNews();

      setAllNews(allNewsArray);
    } catch (error) {
      alert(`Error getting all news: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, [contract]);

  const getStatusText = (status) => {
    switch (status) {
      case 1n:
        return 'Fake';
        break;
      case 2n:
        return 'Not Fake';
        break;

      case 3n:
        return 'Indecisive';
        break;

      default:
        return 'Not Evaluated';
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h2>All News</h2>
      <button onClick={fetchAllNews}>Fetch All News</button>

      {allNews && allNews.length > 0 ? (
        allNews.map((news, index) => (
          <div key={index} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
            <p>Agency: {news.newsAgency}</p>
            <p>Date: {String(news.date)}</p>
            <p>Title: {news.Title}</p>
            <p>Article: {news.Article}</p>
            <p>Upvotes: {String(news.Upvote.length)}</p>
            <p>Downvotes: {String(news.Downvote.length)}</p>
            <p>Status: {getStatusText(news.status)}</p>
          </div>
        ))
      ) : (
        <p>No news available. Click "Fetch All News" to retrieve information.</p>
      )}
    </div>
  );
}

export default GetNews;