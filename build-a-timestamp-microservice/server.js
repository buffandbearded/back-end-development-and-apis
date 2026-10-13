import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

const handler = (req, res) => {
  const { date } = req.params;
  let d;

  if (date === undefined || date === '') {
    d = new Date();
  } else if (/^-?\d+$/.test(date)) {
    d = new Date(Number(date));
  } else {
    d = new Date(date);
  }

  if (isNaN(d.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({ unix: d.getTime(), utc: d.toUTCString() });
};

app.get('/api', handler);
app.get('/api/:date', handler);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});