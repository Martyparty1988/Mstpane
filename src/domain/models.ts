export interface Project {
  id: string;
  name: string;
  location?: string;
  description?: string;
  panelsPerString: number;
  panelWp: number;
  targetPowerMW: number;
  createdAt: number;
}

export type TableSize = "small" | "medium" | "large" | null;
export type TableStatus = "pending" | "in_progress" | "done" | "skipped";

export interface Table {
  id: string;
  projectId: string;
  size: TableSize;
  status: TableStatus;
  position?: { row: number; col: number } | null;
}

export interface WorkRecord {
  id: string;
  projectId: string;
  tableId: string;
  userId: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  durationMinutes: number;
  tableSize: "small" | "medium" | "large";
  notes?: string;
}

export interface Attendance {
  id: string;
  userId: string;
  date: string;
  firstCheckIn: number;
  lastCheckOut: number;
  totalMinutes: number;
}

export type UserRole = "admin" | "worker";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  hourlyRate?: number;
  ratePerString?: number;
}
