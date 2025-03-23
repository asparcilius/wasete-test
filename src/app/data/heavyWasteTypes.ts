export interface HeavyWasteType {
  id: string;
  title: string;
  description: string;
}

export const heavyWasteTypes: HeavyWasteType[] = [
  {
    id: 'soil',
    title: 'Soil',
    description: 'Including topsoil and subsoil'
  },
  {
    id: 'concrete',
    title: 'Concrete',
    description: 'Blocks, slabs, and foundations'
  },
  {
    id: 'bricks',
    title: 'Bricks',
    description: 'Whole or broken bricks'
  },
  {
    id: 'tiles',
    title: 'Tiles',
    description: 'Ceramic, porcelain, or stone tiles'
  },
  {
    id: 'sand',
    title: 'Sand',
    description: 'Building or garden sand'
  },
  {
    id: 'gravel',
    title: 'Gravel',
    description: 'Stone and aggregate'
  },
  {
    id: 'rubble',
    title: 'Rubble',
    description: 'Mixed construction debris'
  }
]; 