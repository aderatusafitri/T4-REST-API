import express from 'express';
import { film } from './src/data/film.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Halo dari REST API Koleksi Film!');
});

app.get('/film', (req, res) => {
    res.status(200).json({
        data: film
    });
});

app.get('/film/:id', (req, res) => {
    const id = Number(req.params.id);

    const filmDitemukan = film.find((item) => item.id === id);

    if (!filmDitemukan) {
        return res.status(404).json({
            error: {
                pesan: 'Film tidak ditemukan',
                kode: 404
            }
        });
    }

    res.status(200).json({
        data: filmDitemukan
    });
});

app.delete('/film/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = film.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: {
                pesan: 'Film tidak ditemukan',
                kode: 404
            }
        });
    }

    film.splice(index, 1);

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});