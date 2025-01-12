interface PayloadType {
  name: string;
  house: House;
  startDate: string | Date;
  endDate: string | Date;
  image: string;
  participantsIds: string[];  // Array of CNICs
}
