export interface AddressSearchResult {
  Id: string;
  Type: string;
  Text: string;
  Highlight: string;
  Description: string;
}

export interface AddressSearchResponse {
  Items: AddressSearchResult[];
}

export interface AddressDetails {
  Id: string;
  DomesticId: string;
  Language: string;
  LanguageAlternatives: string;
  Department: string;
  Company: string;
  SubBuilding: string;
  BuildingNumber: string;
  BuildingName: string;
  SecondaryStreet: string;
  Street: string;
  Block: string;
  Neighbourhood: string;
  District: string;
  City: string;
  Line1: string;
  Line2: string;
  Line3: string;
  Line4: string;
  Line5: string;
  AdminAreaName: string;
  AdminAreaCode: string;
  Province: string;
  ProvinceName: string;
  ProvinceCode: string;
  PostalCode: string;
  CountryName: string;
  CountryIso2: string;
  CountryIso3: string;
  CountryIsoNumber: number;
  SortingNumber1: string;
  SortingNumber2: string;
  Barcode: string;
  POBoxNumber: string;
  Label: string;
  Type: string;
  DataLevel: string;
}

export interface AddressDetailsResponse {
  Items: AddressDetails[];
}

export interface Address {
  id: string;
  line1: string;
  city: string;
  postcode: string;
  buildingNumber: string;
  street: string;
  fullAddress: string;
} 