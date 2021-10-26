import server from './createServer';
import database from './connectDatabase';

//start the database
database(process.env.MONGODB || '');

//start the server
const PORT = process.env.PORT || 5005;

console.log('here');
let svr: any;
if (!svr) {
  console.log('inside');
  svr = server.listen(PORT, () => console.log(`Started on port ${PORT}`));
}
