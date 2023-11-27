let liked_container = document.querySelector(".liked-items");

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

document.addEventListener('DOMContentLoaded', () => {
  
});

const likeButtons = document.querySelectorAll('.like-button');


likeButtons.forEach(button => {
    button.addEventListener('click', () => {

        const likedItem = button.closest('.liked-item');

        likedItem.remove();
    });
})