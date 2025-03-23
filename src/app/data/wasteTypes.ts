export interface WasteType {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: string[];
}

export const wasteTypes: WasteType[] = [
  {
    id: 'household',
    title: 'Household Waste',
    description: 'General household items and furniture',
    icon: '🏠',
    examples: ['Furniture', 'Appliances', 'Carpets', 'General waste']
  },
  {
    id: 'garden',
    title: 'Garden Waste',
    description: 'Green waste from gardens and landscaping',
    icon: '🌿',
    examples: ['Grass', 'Branches', 'Leaves', 'Plants']
  },
  {
    id: 'construction',
    title: 'Construction Waste',
    description: 'Building and renovation materials',
    icon: '🏗️',
    examples: ['Wood', 'Plasterboard', 'Metal', 'Insulation']
  },
  {
    id: 'commercial',
    title: 'Commercial Waste',
    description: 'Business and office waste',
    icon: '🏢',
    examples: ['Office furniture', 'Equipment', 'Packaging']
  }
]; 