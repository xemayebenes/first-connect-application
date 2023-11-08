import { Router } from 'express';
import fetch from 'node-fetch';

import { logger } from '../utils/logger.utils.js';

const eventRouter = Router();

eventRouter.post('/', async (req, res) => {
  logger.info('Event message received');


    await fetch(`https://test-event.free.beeceptor.com/`, {
      method: 'POST',
      body: JSON.stringify({}),
    });

  res.status(200);
  res.send();
});

export default eventRouter;
