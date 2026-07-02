export interface BuyerPreferenceForm {
  budget: string;
  fuel: string;
  transmission: string;
  seatingCapacity: string;
  bodyType: string;
  priority: string;
}

export interface PreferenceFieldError {
  budget?: string;
  fuel?: string;
  transmission?: string;
  seatingCapacity?: string;
  bodyType?: string;
  priority?: string;
}
