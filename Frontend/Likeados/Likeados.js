let liked_items = getCookie("liked_items") || "";
let liked_array = liked_items.split(",");
let liked_container = document.querySelector(".liked-items");

function getCookie(name) {

  let cookie_name = name + "=";

  let cookies = document.cookie.split(";");
  // Recorrer cada cookie
  for(let i = 0; i < cookies.length; i++) {

    let cookie = cookies[i].trim();

    if (cookie.indexOf(cookie_name) == 0) {

      return cookie.substring(cookie_name.length, cookie.length);
    }
  }

  return null;
}

liked_array.forEach(async id => {
  let item = await getItemById(id);
  let item_element = `
    <div class="liked-item" data-id="${item.id}">
      <img src="${item.Image}" alt="">
      <div class="item-info">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <h3>$${item.price}</h3>
      </div>
      <div class="like-button">
        <ion-icon name="heart"></ion-icon>
      </div>
    </div>
  `;
  liked_container.insertAdjacentHTML('beforeend', item_element);
});


const likeButtons = document.querySelectorAll('.like-button');


likeButtons.forEach(button => {
    button.addEventListener('click', () => {

        const likedItem = button.closest('.liked-item');

        likedItem.remove();
    });
})


async function getItemById(id) {
  return await fetch('http://localhost:3000/post/' + id, {
      method: 'GET',
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
}