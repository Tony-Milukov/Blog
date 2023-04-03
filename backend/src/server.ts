const exspress = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const messages = require('./messages.json');

const app = exspress();

app.use(cors());
// default route
app.all('', (req:any, res:any) => {
  res.status(messages.default.status).json(messages.default);
});

app.use('/user', userRouter);

const startServer = (PORT:number) => {
  try {
    app.listen(PORT);
    console.log(`Server was started, and is running on PORT: ${PORT}`);
  } catch (e) {
    console.log(e);
  }
};

startServer(5000);
