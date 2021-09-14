import mongoose from 'mongoose';

export default function (connectionUrl: string) {
  mongoose
    .connect(connectionUrl)
    .then(() => console.log('Database connected!'))
    .catch(() => console.log('Database failed to connect :('));
}
