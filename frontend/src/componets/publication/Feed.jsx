import React, { useState } from 'react';

function  FeedPage() {
  const [tweets, setTweets] = useState([
    {
      id: 1,
      username: 'Usuario1',
      time: 'Hace 1 hora',
      text: 'Este es un tweet de ejemplo 1.',
    },
    {
      id: 2,
      username: 'Usuario2',
      time: 'Hace 2 horas',
      text: 'Este es un tweet de ejemplo 2.',
    },
  ]);

  const handleDeleteTweet = (id) => {
    const updatedTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(updatedTweets);
  };

  return (
    <div className="container mt-4">
      {tweets.map((tweet) => (
        <div className="card mb-3" key={tweet.id}>
          <div className="card-body">
            <div className="media">
              <img src="imagen_usuario.jpg" className="mr-3 rounded-circle" alt="Imagen de Usuario" width="64" height="64" />
              <div className="media-body">
                <h5 className="mt-0">{tweet.username}</h5>
                <p className="text-muted">{tweet.time}</p>
                <p>{tweet.text}</p>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteTweet(tweet.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedPage;
