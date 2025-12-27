import axios from 'axios'
import type { Book } from "../generated/prisma/browser";

import BookCard from "./BookCard"

export default (load_page: (page?: number) => void): HTMLElement => {
    const div = document.createElement('div')
    div.classList.add('book-list')
    for (let i = 0; i < 20; i += 1) {
        div.append(BookCard(load_page, 'test', 'test', 100, 'abobus'))
    }
    return div
}