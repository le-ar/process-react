export type ShopHour = {
  working: boolean;
  hours: {
    id: number;
    from: number;
    to: number;
  }[];
};
