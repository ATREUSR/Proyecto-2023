let title = document.getElementById("title_id");
let userId = document.getElementById("user_id");
let price = document.getElementById("price_id");
let desc = document.getElementById("desc_id");
let defects = document.getElementById("defects_id");
let hasDefects = document.getElementById("hasdefects_id");
let imgType = document.getElementById("imgtype_id");
let imgFile = document.getElementById("imgfile_id");
let submitBtn = document.getElementById("submit_id");

submitBtn.addEventListener("click", () => {
    console.log(title.value);
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