import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import router from './routes/router.js'
config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => { console.log('Server listening on port ' + port); });