// backend/server.js
import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 5000;

app.use(cors()); // allow frontend to connect
app.use(express.json());

// Example route
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'White Cotton T-Shirt', price: 499, image: 'https://via.placeholder.com/200x250?text=White+T-Shirt' },
    { id: 2, name: 'Slim Fit Blue Jeans', price: 999, image: 'https://via.placeholder.com/200x250?text=Blue+Jeans' },
    { id: 3, name: 'Red Crop Top', price: 699, image: 'https://via.placeholder.com/200x250?text=Red+Crop+Top' },
    { id: 4, name: 'Black Cargo Pants', price: 1199, image: 'https://via.placeholder.com/200x250?text=Black+Cargo' },
    { id: 5, name: 'Blue Denim Jacket', price: 1799, image: 'https://via.placeholder.com/200x250?text=Denim+Jacket' },
    { id: 6, name: 'Floral Summer Dress', price: 1599, image: 'https://via.placeholder.com/200x250?text=Floral+Dress' },
    { id: 7, name: 'Yellow Kurti', price: 899, image: 'https://via.placeholder.com/200x250?text=Yellow+Kurti' },
    { id: 8, name: 'White Sneakers', price: 1299, image: 'https://via.placeholder.com/200x250?text=Sneakers' },
    { id: 9, name: 'Black Hoodie', price: 1099, image: 'https://via.placeholder.com/200x250?text=Black+Hoodie' },
    { id: 10, name: 'Formal White Shirt', price: 799, image: 'https://via.placeholder.com/200x250?text=White+Shirt' },
  ]);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
