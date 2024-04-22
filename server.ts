import express from 'express';
import * as scheduleController from './controllers/scheduleController';
import * as taskController from './controllers/taskController';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


app.use(bodyParser.json());                               
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.post('/schedule', scheduleController.createSchedule);
app.get('/schedule/:id', scheduleController.getScheduleById);
app.put('/schedule/:id', scheduleController.updateSchedule);
app.delete('/schedule/:id', scheduleController.deleteSchedule);

app.post('/task', taskController.createTask);
app.get('/task/:id', taskController.getTaskById);
app.put('/task/:id', taskController.updateTask);
app.delete('/task/:id', taskController.deleteTask);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

export default app;
