let title = document.getElementById("title_id");
let userId = document.getElementById("user_id");
let price = document.getElementById("price_id");
let desc = document.getElementById("desc_id");
let defects = document.getElementById("defects_id");
let hasDefectsElement = document.getElementById("hasdefects_id");
let hasDefects = hasDefectsElement.checked.toString();
let imgType = document.getElementById("imgtype_id");
let imgFile = document.getElementById("imgfile_id");
let submitBtn = document.getElementById("submit_id");

submitBtn.addEventListener("click", () => {
  event.preventDefault();
    console.log(title.value);
    fetch('http://localhost:3000/post/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        userId: parseInt(userId.value),
        price: parseInt(price.value),
        description: desc.value,
        defects: defects.value,
        hasDefects: hasDefects.value,
        imgType: imgType.value,
        imgFile: imgFile.value
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      return data;
    })
    .catch(error => console.error('Error:', error)); 
});