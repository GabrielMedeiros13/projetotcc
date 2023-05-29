import http from 'http';
import app from './app/app.js';

//criando o servidor 
const PORT = process.env.PORT || 2030;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port ${PORT}`));