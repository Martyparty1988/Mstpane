import { TableSize } from "./models";

export const PANELS_PER_STRING = 28;

export function getStringCount(size: TableSize): number {
  switch (size) {
    case "small": return 1;
    case "medium": return 1.5;
    case "large": return 2;
    default: return 0;
  }
}

export function calculatePowerWp(size: TableSize, panelWp: number): number {
  const strings = getStringCount(size);
  return strings * PANELS_PER_STRING * panelWp;
}
