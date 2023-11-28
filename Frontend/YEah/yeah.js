let submitBtn = document.getElementById("submit_id");

submitBtn.addEventListener("click", () => {
    fetch('http://localhost:3000/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      return data;
    })
    .catch(error => console.error('Error:', error)); 
});