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

app.listen(port, () => {
    console.log(`📚 Server is listening on port ${port}`);
});