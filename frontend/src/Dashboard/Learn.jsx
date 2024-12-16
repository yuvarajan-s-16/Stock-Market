import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Learn.css';

const Learn = () => {
  const [videos, setVideos] = useState([]);
  const API_KEY = 'AIzaSyCt3nFmNnf3U6egMonpEPIGHiSGIi-gtAo'; // Your YouTube Data API key

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: 'stock data',
          type: 'video',
          key: API_KEY,
          maxResults: 10,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="learn">
      <h2>Stock Data Videos</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
