import axios from 'axios'
import type { Book } from "../generated/prisma/browser";

import BookCard from "./BookCard"

export default (load_page: () => void): HTMLElement => {
    const div = document.createElement('div')
    div.classList.add('book-list')
    axios.get('http://localhost:3001/books').then((res) => {
        res.data.forEach((book_data: Book) => {
            div.append(BookCard(load_page, book_data))
        });
    })
    .catch((error) => {
      console.error('Error fetching author:', error);
    });


    return div
}