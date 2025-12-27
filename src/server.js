import express from 'express'
import { prisma } from './lib/prisma'

const app = express()

app.get('/books', async (req, res) => {
    try {
        res.json(await prisma.book.findMany())
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
})

app.listen(3000, () => {
  console.log(`Listening on port ${port}`)
})
