const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


app.get('/proxy', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            throw new Error('URL parameter is missing');
        }

        if (!url.startsWith('https://allowed-domain.com')) {
            throw new Error('Unauthorized URL');
        }

        const { default: fetch } = await import('node-fetch');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to get a valid response from the remote server');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('An error occurred');
    }
});


app.use((err, req, res, next) => {
    console.error('Fetch error:', err);
    res.status(500).send('An error occurred during the fetch request');
});

app.use(cors({
    origin: 'https://allowed-domain.com'
}));


app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});