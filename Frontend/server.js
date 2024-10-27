const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API para ejecutar el comando enviado desde el frontend
app.post('/command', async (req, res) => {
  const { command } = req.body;
  try {
    const response = await axios.post('http://localhost:3001/command', { peticion: command });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el comando' });
  }
});

// API para cargar el archivo
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Enviar el contenido del archivo al backend (en lugar de un comando)
  axios.post('http://localhost:3001/command', { peticion: fileContent })
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: 'Error al procesar el archivo' }));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
