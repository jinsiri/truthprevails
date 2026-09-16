export type Direction = 'up' | 'down' | 'left' | 'right';

export interface InteractionPoint {
  id: string;
  name: string;
  left: number;
  range: [number, number];
  path: string;
  image: string;
  width: number;
  height: number;
  style: string;
}

export interface InventoryItemData {
  id?: string;
  name: string;
  icon: string;
  description: string;
  level?: number;
  rarity?: 'Normal' | 'Rare' | 'Epic' | 'Legendary';
  useEffect?: string;
}

export type ViewType = 'about' | 'career' | 'careerDetail' | 'skills' | 'contact' | 'statWindow' | 'skillWindow' | 'questWindow' | 'inventoryWindow' | null;

export interface Quest {
  id: number;
  title: string;
  current: number;
  total: number;
}

export interface CharacterStat {
  label: string;
  level: number;
  colorClass: string;
  description?: string;
}
