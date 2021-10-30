import server from './createServer';
import database from './connectDatabase';

//start the database
database(process.env.MONGODB || '');

//start the server
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Started on port ${PORT}`));
