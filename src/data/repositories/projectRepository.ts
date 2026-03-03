import { db } from '../db';
import { Project } from '../../domain/models';

export const projectRepository = {
  async getAll(): Promise<Project[]> {
    return db.projects.orderBy('createdAt').reverse().toArray();
  },
  
  async getById(id: string): Promise<Project | undefined> {
    return db.projects.get(id);
  },
  
  async create(project: Project): Promise<void> {
    await db.projects.add(project);
  },
  
  async update(id: string, changes: Partial<Project>): Promise<void> {
    await db.projects.update(id, changes);
  },
  
  async delete(id: string): Promise<void> {
    await db.projects.delete(id);
  }
};
