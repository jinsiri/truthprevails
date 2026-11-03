export type Direction = 'up' | 'down' | 'left' | 'right';

export interface InteractionPoint {
  id: string;
  name: string;
  left: number;
  range: [number, number];
  /** 입장 지점(문) 위치: 건물 이미지 기준 %, y는 문 윗변 */
  door: { x: number; y: number };
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

export type SkillTier = 'MAIN' | 'SUB';

export interface MasteredSkill {
  label: string;
  tier: SkillTier;
  source: string;
}

export interface CharacterStat {
  label: string;
  level: number;
  colorClass: string;
  description?: string;
}
