import {PhoneNumber} from "./phoneNumber";

export interface Contact {
  id?: number;
  name: string;
  last_name: string;
  phoneNumbers? : PhoneNumber[]
}
