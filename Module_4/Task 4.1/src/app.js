import server from './config/server';
import './config/database';
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
