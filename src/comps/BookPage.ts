import type { Book } from "../generated/prisma/browser";
import axios from 'axios';

export default (book_data: Book): HTMLElement => {
  const { name, desc, price, img, author_id, id: book_id } = book_data;

  const main = document.createElement('div');
  main.classList.add('book-page-main');

  const book_banner = document.createElement('div');
  book_banner.classList.add('book-banner');

  const book_img = document.createElement('img');
  book_img.src = `/imgs${img}`;
  book_img.classList.add('book-img', 'glassmorphism');

  const book_info = document.createElement('div');
  book_info.classList.add('book-info', 'glassmorphism');

  const book_title = document.createElement('h1');
  book_title.textContent = name;
  book_title.classList.add('book-title');

  const book_author = document.createElement('p');
  book_author.textContent = 'Loading author...';
  book_author.classList.add('book-author');

  const book_desc = document.createElement('p');
  book_desc.textContent = desc;
  book_desc.classList.add('book-desc');

  const book_footer = document.createElement('div');
  book_footer.classList.add('book-footer');

  const book_price = document.createElement('span');
  book_price.textContent = `${price} $`;
  book_price.classList.add('book-price');

  const book_btn = document.createElement('button');
  book_btn.textContent = 'Read';
  book_btn.classList.add('book-btn');

  book_footer.append(book_price, book_btn);
  book_info.append(book_title, book_author, book_desc, book_footer);
  book_banner.append(book_img, book_info);
  main.append(book_banner);

  const reviews = document.createElement('div');
  reviews.classList.add('book-reviews');

  const reviews_title = document.createElement('h2');
  reviews_title.textContent = 'Reviews (loading...)';
  reviews_title.classList.add('book-reviews-title', 'glassmorphism');

  const reviews_list = document.createElement('div');
  reviews_list.classList.add('book-reviews-list');
  reviews_list.innerHTML = '<div class="loading">Loading reviews...</div>';

  reviews.append(reviews_title, reviews_list);
  main.append(reviews);

  loadAuthorData(author_id, book_author);
  
  loadReviewsData(book_id, reviews_title, reviews_list);

  return main;
};

function loadAuthorData(authorId: number, authorElement: HTMLElement): void {
  axios.get(`http://localhost:3001/authors/${authorId}`)
    .then((response) => {
      if (response.data && response.data.name) {
        authorElement.textContent = `Author: ${response.data.name}`;

        if (response.data.books && response.data.books.length > 0) {
          const authorBooks = document.createElement('small');
          authorBooks.textContent = ` (${response.data.books.length} books)`;
          authorElement.appendChild(authorBooks);
        }
      } else {
        authorElement.textContent = 'Author: Unknown';
      }
    })
    .catch((error) => {
      console.error('Error loading author:', error);
      authorElement.textContent = 'Author: Error loading';
    });
}

function loadReviewsData(bookId: number, titleElement: HTMLElement, listElement: HTMLElement): void {
  axios.get(`http://localhost:3001/reviews?bookId=${bookId}`)
    .then((response) => {
      const reviews = response.data;
      
      if (reviews && reviews.length > 0) {
        titleElement.textContent = `Reviews (${reviews.length})`;
        renderReviewsList(reviews, listElement);
      } else {
        titleElement.textContent = 'Reviews (0)';
        listElement.innerHTML = '<div class="no-reviews">No reviews yet. Be the first to review!</div>';
      }
    })
    .catch((error) => {
      console.error('Error loading reviews:', error);
      titleElement.textContent = 'Reviews (Error)';
      listElement.innerHTML = '<div class="error">Error loading reviews</div>';
    });
}

function renderReviewsList(reviews: any[], container: HTMLElement): void {
  container.innerHTML = '';
  
  reviews.forEach((review) => {
    const reviewElement = createReviewElement(review);
    container.appendChild(reviewElement);
  });
}

function createReviewElement(review: any): HTMLElement {
  const reviewDiv = document.createElement('div');
  reviewDiv.classList.add('book-review', 'glassmorphism');

  const review_header = document.createElement('div');
  review_header.classList.add('book-review-header');

  const review_rating = document.createElement('span');
  review_rating.textContent = getRatingStars(review.rating);
  review_rating.classList.add('book-review-rating');
  
  const review_rating_number = document.createElement('small');
  review_rating_number.textContent = ` ${review.rating}/5`;
  review_rating.appendChild(review_rating_number);

  const review_date = document.createElement('span');
  const date = new Date(review.createdAt);
  review_date.textContent = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  review_date.classList.add('book-review-date');

  const review_text = document.createElement('p');
  review_text.textContent = review.text;
  review_text.classList.add('book-review-text');

  review_header.append(review_rating, review_date);
  reviewDiv.append(review_header, review_text);

  return reviewDiv;
}

function getRatingStars(rating: number): string {
  const stars = ['☆☆☆☆☆', '★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★'];
  return stars[Math.min(Math.max(Math.round(rating), 0), 5)];
}