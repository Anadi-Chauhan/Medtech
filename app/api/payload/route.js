import payload from 'payload';
import { connect } from 'mongoose';

const handler = async (req, res) => {
  await connect(process.env.MONGODB_URI);
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: require('express')(),
    onInit: async () => {
      payload.logger.info(`Payload Admin is now live at http://localhost:3001/admin`);
    },
  });

  res.status(200).json({ message: 'Payload initialized' });
};

export default handler;
