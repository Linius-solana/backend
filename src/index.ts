import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { getSwapTxs } from './tx';

const app: Express = express();
const port = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/api/v1/txs/get_swap', async (req: Request, res: Response) => {
  console.log('GET /api/v1/txs/get_swap');
  try {
    const address = req.query.address as string;
    const swapTxs = await getSwapTxs(address);
    return res.status(200).send(swapTxs);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});