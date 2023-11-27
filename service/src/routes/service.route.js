import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { logger } from '../utils/logger.utils.js';
import { testSharedLib } from 'shared';
// const { testSharedLib } = shared

// console.log('testSharedLib'), testSharedLib;

const serviceRouter = Router();

const MIN_AMOUNT = +process.env.MIN_AMOUNT;

serviceRouter.post('/', async (req, res) => {
  logger.info('Order update extension executed');
  logger.info(`Minumum required is ${MIN_AMOUNT} `);
  let convertedMinAmount = MIN_AMOUNT;
  // const convertedMinAmount = testSharedLib(MIN_AMOUNT);
  // logger.info(`Converted Minumum required is ${convertedMinAmount} `);

  const cart = req.body.resource.obj;

  if (cart.taxedPrice.totalNet.centAmount > convertedMinAmount) {
    res.status(200).send();
  } else {
    res.status(400).send({
      errors: [
        {
          code: 'InvalidInput',
          message: `Minimum required ${MIN_AMOUNT} is ${convertedMinAmount}`,
        },
      ],
    });
  }
});

export default serviceRouter;
