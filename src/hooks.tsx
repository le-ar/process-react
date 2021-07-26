import { useEffect, useState } from "react";
import { ShopDb } from "./db/db_shop";
import { Shop } from "./db/shop";

const shopDb = new ShopDb();

export function AddShop(name: string) {
  shopDb.AddShop(name);
}

export function UpdateShopWorkingDays(
  shopId: number,
  day: number,
  working: boolean
) {
  shopDb.UpdateShopWorkingDays(shopId, day, working);
}

export function RemoveShop(shopId: number) {
  shopDb.RemoveShop(shopId);
}

export function useShops() {
  const [shops, setShops] = useState(shopDb.Shops);
  useEffect(() => {
    const callback = (shops: Shop[]) => setShops(shops);
    shopDb.OnChange.on(callback);

    return () => {
      shopDb.OnChange.off(callback);
    };
  }, []);

  return shops;
}

export function UpdateAddShopHour(day: number, shopId: number) {
  shopDb.AddShopHours(day, shopId);
}

export function UpdateRemoveShopHour(
  day: number,
  shopId: number,
  shopHourId: number
) {
  shopDb.RemoveShopHour(day, shopId, shopHourId);
}

export function UpdateShopHour(
  day: number,
  shopId: number,
  shopHourId: number,
  from: number,
  to: number
) {
  shopDb.UpdateShopHour(day, shopId, shopHourId, from, to);
}
