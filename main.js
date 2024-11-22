
import express from 'express';
import { creates } from './db/create.js';

const app = express();

creates();

app.listen(3000, () => {
    console.log('Server listening on 3000');
});
  