import { EventEmitter } from "../utils";
import { Shop } from "./shop";
import { ShopHour } from "./shop_hour";

export class ShopDb {
  private _Shops: Shop[] = [];
  private ShopId: number = 0;
  private ShopHourId: number = 0;
  private _OnChange = new EventEmitter<Shop[]>();

  get Shops() {
    return this._Shops;
  }

  get OnChange() {
    return this._OnChange;
  }

  AddShop(name: string) {
    const newShop: Shop = {
      id: ++this.ShopId,
      name,
      workingDays: Array.from({ length: 7 }).map(() => ({
        working: false,
        hours: [
          {
            id: ++this.ShopHourId,
            from: 0,
            to: 23,
          },
        ],
      })),
    };
    this._Shops = [...this._Shops, newShop];
    this._OnChange.emit(this._Shops);
  }

  UpdateShop(newShop: Shop) {
    this._Shops = this._Shops.map((shop) => {
      if (shop.id === newShop.id) {
        return newShop;
      }
      return shop;
    });
    this._OnChange.emit(this._Shops);
  }

  UpdateShopWorkingDays(shopId: number, day: number, working: boolean) {
    const shop = this._Shops.find((shop) => shopId === shop.id);
    if (shop == null) {
      return;
    }

    const workingDays = shop.workingDays.map((wd, i) =>
      i === day ? { ...wd, working } : wd
    );

    this.UpdateShop({ ...shop, workingDays });
  }

  RemoveShop(shopId: number) {
    this._Shops = this._Shops.filter((shop) => shop.id !== shopId);
    this._OnChange.emit(this._Shops);
  }

  AddShopHours(day: number, shopId: number) {
    const shop = this._Shops.find((shop) => shopId === shop.id);
    if (shop == null) {
      return;
    }

    const hours = [
      ...shop.workingDays[day].hours,
      {
        id: ++this.ShopHourId,
        from: 0,
        to: 23,
      },
    ];

    const workingDays: ShopHour[] = shop.workingDays.map((wd, i) =>
      i === day ? { ...wd, hours } : wd
    );
    this.UpdateShop({ ...shop, workingDays });
  }

  RemoveShopHour(day: number, shopId: number, shopHourId: number) {
    const shop = this._Shops.find((shop) => shopId === shop.id);
    if (shop == null) {
      return;
    }

    const hours = shop.workingDays[day].hours.filter(
      (sh) => sh.id !== shopHourId
    );

    const workingDays: ShopHour[] = shop.workingDays.map((wd, i) =>
      i === day ? { ...wd, hours } : wd
    );
    this.UpdateShop({ ...shop, workingDays });
  }

  UpdateShopHour(
    day: number,
    shopId: number,
    shopHourId: number,
    from: number,
    to: number
  ) {
    
    const shop = this._Shops.find((shop) => shopId === shop.id);
    if (shop == null) {
      return;
    }

    const hours = shop.workingDays[day].hours.map(
      (sh) => {
        if (sh.id === shopHourId) {
          return {
            id: sh.id,
            from,
            to,
          };
        }
        return sh;
      }
    );

    const workingDays: ShopHour[] = shop.workingDays.map((wd, i) =>
      i === day ? { ...wd, hours } : wd
    );
    this.UpdateShop({ ...shop, workingDays });
  }
}
