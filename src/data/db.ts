import Dexie, { Table as DexieTable } from 'dexie';
import { Project, Table, WorkRecord, Attendance, User } from '../domain/models';

export class AppDatabase extends Dexie {
  projects!: DexieTable<Project, string>;
  projectTables!: DexieTable<Table, string>;
  workRecords!: DexieTable<WorkRecord, string>;
  attendances!: DexieTable<Attendance, string>;
  users!: DexieTable<User, string>;

  constructor() {
    super('MSTDatabase');
    this.version(1).stores({
      projects: 'id, createdAt',
      projectTables: 'id, projectId, status',
      workRecords: 'id, projectId, tableId, userId, date',
      attendances: 'id, userId, date',
      users: 'id, role'
    });
  }
}

export const db = new AppDatabase();
