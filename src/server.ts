import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from './lib/prisma';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

app.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/reviews', async (req: Request, res: Response) => {
    try {
        const { bookId } = req.query;
        
        const whereCondition = bookId ? { bookId: parseInt(bookId as string) } : {};
        
        const reviews = await prisma.review.findMany({
            where: whereCondition,
            include: {
                book: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/reviews/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const review = await prisma.review.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                book: {
                    select: {
                        id: true,
                        name: true,
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        
        res.json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/authors', async (req: Request, res: Response) => {
    try {
        const authors = await prisma.author.findMany({
            include: {
                books: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        
        res.json(authors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/authors/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const author = await prisma.author.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                books: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        img: true,
                        reviews: {
                            select: {
                                rating: true
                            }
                        }
                    }
                }
            }
        });
        
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        
        res.json(author);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/authors/name/:name', async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        
        const author = await prisma.author.findUnique({
            where: {
                name: name
            },
            include: {
                books: true
            }
        });
        
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        
        res.json(author);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`📚 Server is listening on port ${port}`);
});