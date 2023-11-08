import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { logger } from '../utils/logger.utils.js';

const serviceRouter = Router();

const MIN_AMOUNT = +process.env.MIN_AMOUNT;

serviceRouter.post('/', async (req, res) => {
  logger.info('Order update extension executed');
  logger.info(`Minumum required is ${MIN_AMOUNT} `);

  const cart  = req.body.resource.obj

  if(cart.taxedPrice.totalNet.centAmount > MIN_AMOUNT) {
      res.status(200).send()
  } else {
      res.status(400).send({
        errors: [
          {
            code: 'InvalidInput',
            message: `Minimum required is ${MIN_AMOUNT }`,
          },
        ],
      });

  }

  
});

export default serviceRouter;
