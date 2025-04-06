const express = require('express');
const app = express();
const port = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');

// Static files (CSS, images, etc.)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`✅ Server is running: http://localhost:${port}`);
});
