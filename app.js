const express = require('express');
const app = express();
const port = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');

// Static files (CSS, images, etc.)
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const milkEntries = [];
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

app.get('/rate-chart', (req, res) => {
  res.render('rate-chart');
});

// Show login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form POST
app.post('/login', (req, res) => {
  const { farmerId, password } = req.body;

  // Temporary dummy check (replace with DB later)
  if (farmerId === 'farmer123' && password === '1234') {
    res.send('🎉 लॉगिन यशस्वी!');
  } else {
    res.send('❌ चुकीचा आयडी किंवा पासवर्ड');
  }
});
app.get('/collect', (req, res) => {
  res.render('collect');
});

app.post('/collect', (req, res) => {
  const { name, date, type, quantity, fat, degree } = req.body;

  const entry = {
    name,
    date,
    type,
    quantity,
    fat,
    degree,
  };

  // Save in the array
  milkEntries.push(entry);

  res.send(`
    <h2>✅ संकलन यशस्वी!</h2>
    <p><strong>शेतकरी:</strong> ${name}</p>
    <p><strong>दिनांक:</strong> ${date}</p>
    <p><strong>दूध प्रकार:</strong> ${type}</p>
    <p><strong>प्रमाण:</strong> ${quantity} लिटर</p>
    <p><strong>फॅट:</strong> ${fat}</p>
    <p><strong>डिग्री:</strong> ${degree}</p>

    <a href="/collect">🔁 परत फॉर्म</a> | 
    <a href="/summary">📋 संकलन सारांश</a> | 
    <a href="/">🏠 मुख्यपृष्ठ</a>
  `);
});
app.get('/summary', (req, res) => {
  let html = `<h2>📋 आजचे संकलन</h2><table border="1" cellpadding="5" style="width: 90%; margin: auto;">
  <tr><th>नाव</th><th>दिनांक</th><th>प्रकार</th><th>प्रमाण</th><th>फॅट</th><th>डिग्री</th></tr>`;

  milkEntries.forEach(entry => {
    html += `<tr>
      <td>${entry.name}</td>
      <td>${entry.date}</td>
      <td>${entry.type}</td>
      <td>${entry.quantity} लिटर</td>
      <td>${entry.fat}</td>
      <td>${entry.degree}</td>
    </tr>`;
  });

  html += `</table><br><a href="/">⬅️ मुख्यपृष्ठ</a>`;
  res.send(html);
});

app.get('/', (req, res) => {
  res.render('home');
});
