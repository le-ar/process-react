import React, { Fragment, useState } from "react";
import Card from "../Card/Card";
import { Shop } from "../db/shop";
import { AddShop, RemoveShop } from "../hooks";
import { RoundButtonX } from "../RoundButton/RoundButton";
import "./shops.scss";

// function WeekDay(props: {
//   name: string;
//   checked: boolean;
//   onCheck: (checked: boolean) => void;
// }) {
//   return (
//     <label className="day">
//       <div>{props.name}</div>
//       <input
//         type="checkbox"
//         checked={props.checked}
//         onChange={(e) => {
//           props.onCheck(e.target.checked);
//         }}
//       />
//     </label>
//   );
// }

const ShopView = React.memo(function (props: { shop: Shop }) {
  const shop = props.shop;

  // const check = (day: number, checked: boolean) => {
  //   UpdateShopWorkingDays(shop.id, day, checked);
  // };

  const remove = () => {
    RemoveShop(shop.id);
  };

  return (
    <div className="shop">
      <div className="shop__name">{props.shop.name}</div>
      {/* <div className="week">
        {shop.workingDays.map((day, i) => (
          <WeekDay
            key={WeekNames[i]}
            name={WeekNames[i]}
            checked={!!day}
            onCheck={(checked) => check(i, checked)}
          />
        ))}
      </div> */}
      <div>
        <RoundButtonX onClick={remove} />
      </div>
    </div>
  );
});

export default function Shops(props: { shops: Shop[] }) {
  const shops = props.shops;
  const [shopName, setShopName] = useState("");
  const [json, setJson] = useState("");

  const addShop = () => {
    if (shopName.length > 0) {
      AddShop(shopName);
      setShopName("");
    }
  };

  const Save = () => {
    setJson(
      JSON.stringify(shops, undefined, 4)
        .replaceAll("\n", "<br>")
        .replaceAll(" ", "&nbsp;")
    );
  };

  return (
    <Card title="Точки">
      <Fragment>
        {shops.map((shop) => (
          <ShopView key={shop.id} shop={shop} />
        ))}
      </Fragment>
      <div>
        <div className="txt-hidden">Добавить:</div>
        <div className="add-shop">
          <input
            value={shopName}
            onChange={(e) => {
              setShopName(e.target.value);
            }}
          />
          <button onClick={addShop}>Добавить</button>
        </div>
      </div>
      <div>
        <button onClick={Save} style={{ boxSizing: "border-box" }}>
          Save
        </button>
        <button
          onClick={() => {
            setJson("");
          }}
        >
          X
        </button>
        <div dangerouslySetInnerHTML={{ __html: json }}>{}</div>
      </div>
    </Card>
  );
}
