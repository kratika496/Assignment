import { Request, Response } from 'express';
//import prisma from '../prisma';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.create({
      data: req.body,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const id = parseInt(req.params?.id);
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params?.id);

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: req.body,
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params?.id);

  try {
    await prisma.task.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};
