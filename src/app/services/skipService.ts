import { API_BASE_URL, API_ENDPOINTS, API_CONFIG } from '../config/api';
import { SkipData } from '../types/api';
import { handleApiResponse, createQueryString, fetchWithTimeout } from '../utils/api';

export interface GetSkipsParams {
  postcode: string;
  area?: string;
}

export interface Skip {
  id: string;
  size: number;
  price: number;
  period: number;
  isPrivateOnly: boolean;
  allowsHeavyWaste: boolean;
}

export class SkipService {
  private static instance: SkipService;
  
  private constructor() {}
  
  static getInstance(): SkipService {
    if (!SkipService.instance) {
      SkipService.instance = new SkipService();
    }
    return SkipService.instance;
  }
  
  async getSkipsByLocation({ postcode, area }: GetSkipsParams): Promise<Skip[]> {
    try {
      const queryString = createQueryString({ postcode, area: area || '' });
      const url = `${API_BASE_URL}${API_ENDPOINTS.SKIPS_BY_LOCATION}?${queryString}`;
      
      const response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
        timeout: API_CONFIG.TIMEOUT,
      });
      
      const data = await handleApiResponse<SkipData[]>(response);
      
      return this.transformSkipData(data);
    } catch (error) {
      console.error('Error fetching skips:', error);
      throw error;
    }
  }
  
  private transformSkipData(data: SkipData[]): Skip[] {
    return data.map((skip) => ({
      id: skip.id.toString(),
      size: skip.size,
      price: skip.price_before_vat + skip.vat,
      period: skip.hire_period_days,
      isPrivateOnly: !skip.allowed_on_road,
      allowsHeavyWaste: skip.allows_heavy_waste,
    }));
  }
}

// Export a singleton instance
export const skipService = SkipService.getInstance(); 