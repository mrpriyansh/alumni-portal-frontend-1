function fetcher(url) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
}

export default fetcher;
