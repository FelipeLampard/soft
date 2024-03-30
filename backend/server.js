import express from 'express';
import cors from 'cors';
import Titleroutes from './database/routes/title.route.js'
import userRoutes from './database/routes/user.routes.js' 
import loginRoutes from './database/routes/login.routes.js'
import { logger } from 'logger-express'


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use(logger());

app.use('/api/v1', userRoutes );
app.use('/api/v1', Titleroutes); 
app.use('api/v1', loginRoutes);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});