import React from "react";
import Card from "../Card/Card";
import { Shop } from "../db/shop";
import {
  UpdateAddShopHour,
  UpdateRemoveShopHour,
  UpdateShopHour,
  UpdateShopWorkingDays,
} from "../hooks";
import { RoundButtonPlus, RoundButtonX } from "../RoundButton/RoundButton";
import { Times, WeekNamesFull } from "../utils";
import "./week-day.scss";

const ShopHourView = React.memo(function (props: { day: number; shop: Shop }) {
  const shop = props.shop;
  const workingDay = shop.workingDays[props.day];

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    UpdateShopWorkingDays(shop.id, props.day, e.target.checked);
  };

  const addHours = () => {
    UpdateAddShopHour(props.day, shop.id);
  };
  const removeHours = (shopHourId: number) => {
    UpdateRemoveShopHour(props.day, shop.id, shopHourId);
  };

  return (
    <div className="week-day-shop">
      <label className="week-day-shop__label">
        <div>
          <input type="checkbox" onChange={onCheck} />
        </div>
        <div className="week-day-shop__name">{shop.name}</div>
      </label>
      <div>
        {workingDay.hours.map((wh, i) => (
          <div
            key={wh.id}
            className="week-day-shop__hours"
            style={{ display: workingDay.working ? "block" : "none" }}
          >
            <span>С</span>
            <select
              defaultValue={wh.from}
              onChange={(e) => {
                UpdateShopHour(
                  props.day,
                  shop.id,
                  wh.id,
                  parseInt(e.target.value),
                  wh.to
                );
              }}
            >
              {Times.map((time, i) => (
                <option key={time} value={i}>
                  {time}
                </option>
              ))}
            </select>
            <span>До</span>
            <select
              defaultValue={wh.to}
              onChange={(e) => {
                UpdateShopHour(
                  props.day,
                  shop.id,
                  wh.id,
                  wh.from,
                  parseInt(e.target.value)
                );
              }}
            >
              {Times.map((time, i) => (
                <option key={time} value={i}>
                  {time}
                </option>
              ))}
            </select>
            {i + 1 === workingDay.hours.length ? (
              <RoundButtonPlus onClick={addHours} />
            ) : (
              <RoundButtonX onClick={() => removeHours(wh.id)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default React.memo(function (props: { day: number; shops: Shop[] }) {
  return (
    <Card hiddable={true} title={WeekNamesFull[props.day]}>
      {props.shops.map((sh) => (
        <ShopHourView key={sh.id} shop={sh} day={props.day} />
      ))}
    </Card>
  );
});
