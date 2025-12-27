export default (
  name: string,
  desc: string,
  price: number,
  author: string,
  img: string = '/logo.png'
): HTMLElement => {
  const main = document.createElement('div')
  main.classList.add('book-page-main')

  const book_banner = document.createElement('div')
  book_banner.classList.add('book-banner')

  const book_img = document.createElement('img')
  book_img.src = img
  book_img.classList.add('book-img', 'glassmorphism')

  const book_info = document.createElement('div')
  book_info.classList.add('book-info', 'glassmorphism')

  const book_title = document.createElement('h1')
  book_title.textContent = name
  book_title.classList.add('book-title')

  const book_author = document.createElement('p')
  book_author.textContent = `Author: ${author}`
  book_author.classList.add('book-author')

  const book_desc = document.createElement('p')
  book_desc.textContent = desc
  book_desc.classList.add('book-desc')

  const book_footer = document.createElement('div')
  book_footer.classList.add('book-footer')

  const book_price = document.createElement('span')
  book_price.textContent = `${price} $`
  book_price.classList.add('book-price')

  const book_btn = document.createElement('button')
  book_btn.textContent = 'Read'
  book_btn.classList.add('book-btn')

  book_footer.append(book_price, book_btn)
  book_info.append(book_title, book_author, book_desc, book_footer)
  book_banner.append(book_img, book_info)
  main.append(book_banner)

  const reviews = document.createElement('div')
  reviews.classList.add('book-reviews')

  const reviews_title = document.createElement('h2')
  reviews_title.textContent = 'Reviews'
  reviews_title.classList.add('book-reviews-title', 'glassmorphism')

  const reviews_list = document.createElement('div')
  reviews_list.classList.add('book-reviews-list')

  const review = document.createElement('div')
  review.classList.add('book-review', 'glassmorphism')

  const review_header = document.createElement('div')
  review_header.classList.add('book-review-header')

  const review_rating = document.createElement('span')
  review_rating.textContent = '★★★★☆'
  review_rating.classList.add('book-review-rating')

  const review_date = document.createElement('span')
  review_date.textContent = '2025-01-10'
  review_date.classList.add('book-review-date')

  const review_text = document.createElement('p')
  review_text.textContent = 'Очень сильная книга, атмосферная и мрачная.'
  review_text.classList.add('book-review-text')

  review_header.append(review_rating, review_date)
  review.append(review_header, review_text)
  reviews_list.append(review)

  reviews.append(reviews_title, reviews_list)
  main.append(reviews)

  return main
}
