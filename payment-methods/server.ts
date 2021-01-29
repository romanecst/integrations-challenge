import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as opn from 'opn';
import PayPal from './PayPal';

const PORT = 4444;

const server = express();

server.use(express.static(__dirname));
server.use(bodyParser.json());

const router = express.Router();

router.post('/authorize', async (req, res, next) => {
  const response = await PayPal.authorize({
    amount: 1299,
    currencyCode: 'EUR',
    processorAccountId: 'my-paypal-account',
    processorCredentials: {
      clientId:
        'Abp8AFfM7k8Lt4A1y0_jBKNPznKe99TOHZ9CzJHhlMyJdb4iih1Tuf4srHkuqmA-V5DisAp0d_JyTgAS',
      clientSecret:
        'EB429LvO7xYnShqPtloyBouCIFg5msNeRuDjDs7NShJPVwvZBOxH9HJ8SekXxwfg9s8AwVTuyO9pkFyU',
    },
    paymentMethod: {
      orderId: req.body.orderId,
    },
  });

  return res.send(response);
});

router.post('/capture', async (req, res, next) => {
  const response = await PayPal.capture({
    processorTransactionId: req.body.orderId,
    processorAccountId: 'my-paypal-account',
    processorCredentials: {
      clientId:
        'Abp8AFfM7k8Lt4A1y0_jBKNPznKe99TOHZ9CzJHhlMyJdb4iih1Tuf4srHkuqmA-V5DisAp0d_JyTgAS',
      clientSecret:
        'EB429LvO7xYnShqPtloyBouCIFg5msNeRuDjDs7NShJPVwvZBOxH9HJ8SekXxwfg9s8AwVTuyO9pkFyU',
    },
  });

  return res.send(response);
});

router.post('/cancel', async (req, res, next) => {
  const response = await PayPal.cancel({
    processorTransactionId: req.body.orderId,
    processorAccountId: 'my-paypal-account',
    processorCredentials: {
      clientId:
        'Abp8AFfM7k8Lt4A1y0_jBKNPznKe99TOHZ9CzJHhlMyJdb4iih1Tuf4srHkuqmA-V5DisAp0d_JyTgAS',
      clientSecret:
        'EB429LvO7xYnShqPtloyBouCIFg5msNeRuDjDs7NShJPVwvZBOxH9HJ8SekXxwfg9s8AwVTuyO9pkFyU',
    },
  });

  return res.send(response);
});

server.use('/api', router);

server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
  opn(`http://localhost:${PORT}`);
});
