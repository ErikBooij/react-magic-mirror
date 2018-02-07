export default () => {
  return fetch('https://crypto.booij.me/portfolio.php')
    .then(response => response.json());
};
