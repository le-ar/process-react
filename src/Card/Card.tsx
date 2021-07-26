import { useState } from "react";
import Switch from "../Switch/Switch";
import { ReactChildren } from "../utils";
import "./card.scss";

export default function Card(props: {
  hiddable?: boolean;
  title: string;
  children?: ReactChildren;
}) {
  const [visible, setVisible] = useState(true);

  const hiddable = !!props.hiddable;

  return (
    <div className={["card", visible ? "" : "hidden"].join(" ")}>
      <div className="card__header">
        <div>{props.title}</div>
        {hiddable && (
          <div>
            <Switch
              checked={visible}
              onChange={(checked) => {
                setVisible(checked);
              }}
            />
          </div>
        )}
      </div>
      <div className="card__body">{props.children}</div>
    </div>
  );
}
