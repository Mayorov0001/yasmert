import type { Book } from "../generated/prisma/browser";
import axios from 'axios';

export default (
  load_page: (page?: number, book_data?: Book) => void,
  book_data: Book
): HTMLElement => {
  const { name, desc, price, img, author_id } = book_data;
  
  const card = document.createElement('div');
  card.classList.add('card', 'glassmorphism');

  const card_img = document.createElement('img');
  card_img.src = `/imgs${img}`;
  card_img.classList.add('card-img');

  const card_content = document.createElement('div');
  card_content.classList.add('card-content');

  const card_title = document.createElement('h3');
  card_title.classList.add('card-title');
  card_title.textContent = name;

  const card_author = document.createElement('p');
  card_author.classList.add('card-author');
  card_author.textContent = 'Loading author...';

  const card_desc = document.createElement('p');
  card_desc.classList.add('card-desc');
  card_desc.textContent = desc;

  const card_footer = document.createElement('div');
  card_footer.classList.add('card-footer');

  const card_price = document.createElement('span');
  card_price.classList.add('card-price');
  card_price.textContent = `${price} $`;

  const card_btn = document.createElement('button');
  card_btn.classList.add('card-btn');
  card_btn.textContent = 'Read';

  card_btn.addEventListener('click', () => {
    load_page(1, book_data);
  });

  card_footer.append(card_price, card_btn);
  card_content.append(card_title, card_author, card_desc, card_footer);
  card.append(card_img, card_content);

  axios.get(`http://localhost:3001/authors/${author_id}`)
    .then((response) => {
      if (response.data && response.data.name) {
        card_author.textContent = response.data.name;
      } else {
        card_author.textContent = 'Unknown Author';
      }
    })
    .catch((error) => {
      console.error('Error fetching author:', error);
      card_author.textContent = 'Error loading author';
    });

  return card;
};