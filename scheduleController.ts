import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});;

export const createSchedule = async (req: Request, res: Response) => {
  try {
    console.log("hello");
    const schedule = await prisma.schedule.create({
      data: req.body,
    });
    res.json(schedule);
  } catch (error) {
    
    console.log (error);
    
    res.status(500).json({ error: 'Error creating schedule' });
  }
};

export const getScheduleById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);  // Ensure id is of type string
    const schedule = await prisma.schedule.findUnique({
      where: {
        id: id,
      },
    });
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching schedule' });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);  // Ensure id is of type string
    const updatedSchedule = await prisma.schedule.update({
      where: {
        id: id,
      },
      data: req.body,
    });
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Error updating schedule' });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const id = parseInt( req.params.id) // Ensure id is of type string
    await prisma.schedule.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting schedule' });
  }
};
