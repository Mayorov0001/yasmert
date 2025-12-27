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
  book_img.classList.add('book-img')

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

  return main
}
