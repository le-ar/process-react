import { ShopHour } from "./shop_hour";

export type Shop = {
  id: number;
  name: string;
  workingDays: ShopHour[];
};
