import { AddressSearchResponse, AddressDetailsResponse, Address } from '../types/address';

const API_KEY = 'JP84-GY97-YZ96-GG45';
const BASE_URL = 'https://services.postcodeanywhere.co.uk';

export class AddressService {
  private static instance: AddressService;
  
  private constructor() {}
  
  static getInstance(): AddressService {
    if (!AddressService.instance) {
      AddressService.instance = new AddressService();
    }
    return AddressService.instance;
  }
  
  async searchAddresses(postcode: string): Promise<Address[]> {
    try {
      const searchParams = new URLSearchParams({
        Key: API_KEY,
        Text: postcode,
        Origin: 'GBR',
        Countries: 'GB',
        Limit: '7',
        Language: 'en'
      });
      
      const response = await fetch(
        `${BASE_URL}/Capture/Interactive/Find/v1.00/json3ex.ws?${searchParams}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      
      const data: AddressSearchResponse = await response.json();
      
      return data.Items.map(item => ({
        id: item.Id,
        line1: item.Text,
        city: item.Description.split(',')[0].trim(),
        postcode: postcode,
        buildingNumber: '',
        street: '',
        fullAddress: `${item.Text}, ${item.Description}`
      }));
    } catch (error) {
      console.error('Error searching addresses:', error);
      throw error;
    }
  }
  
  async getAddressDetails(id: string): Promise<Address> {
    try {
      const searchParams = new URLSearchParams({
        Key: API_KEY,
        Id: id,
        Origin: 'GBR',
        Countries: 'GB',
        Language: 'en'
      });
      
      const response = await fetch(
        `${BASE_URL}/Capture/Interactive/Retrieve/v1.00/json3ex.ws?${searchParams}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch address details');
      }
      
      const data: AddressDetailsResponse = await response.json();
      const details = data.Items[0];
      
      return {
        id: details.Id,
        line1: details.Line1,
        city: details.City,
        postcode: details.PostalCode,
        buildingNumber: details.BuildingNumber,
        street: details.Street,
        fullAddress: [details.Line1, details.Line2, details.City, details.PostalCode]
          .filter(Boolean)
          .join(', ')
      };
    } catch (error) {
      console.error('Error fetching address details:', error);
      throw error;
    }
  }
}

export const addressService = AddressService.getInstance(); 