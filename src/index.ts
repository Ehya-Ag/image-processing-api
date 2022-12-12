import express from 'express';
import routes from './routes';

const port: number = 3000;
const app: express.Application = express();

app.use('/api', routes);
app.get('/', (req: express.Request, res: express.Response): void => {
  //A simple description for home page
  res.send(
    '<h1>Welcome to my image processing API</h1><p>To work with this API, you must give in url the name, the width and the height of the image.</p><p>Examples:<ul><li><a href="/api/images?filename=encenadaport&width=100&height=100">/api/images?filename=encenadaport&width=100&height=100</a></li></ul></p>'
  );
});
app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
