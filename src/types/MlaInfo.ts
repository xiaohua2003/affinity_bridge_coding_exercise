export interface Office {
  postal: string;
  tel: string;
}

export interface MlaInfo {
  name: string;
  email: string;
  photoUrl: string;
  districtName: string;
  offices: Office[];
}
