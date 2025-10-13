import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import http from 'http'

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '4mb' }))
app.use(cors());

app.use('/api/status', (_req, res) => res.send('Server is up and running'));


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => { console.log('Server is running on PORT:', PORT) });