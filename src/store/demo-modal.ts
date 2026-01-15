import { atom } from 'nanostores';

export interface DemoLinkData {
  url: string;
  label: string;
  category: string;
}

export const isDemoModalOpen = atom(false);
export const demoLinkData = atom<DemoLinkData | null>(null);

export function openDemoModal(data: DemoLinkData) {
  demoLinkData.set(data);
  isDemoModalOpen.set(true);
}

export function closeDemoModal() {
  isDemoModalOpen.set(false);
  // Clear data after animation might be better, but for now immediate is fine
}
