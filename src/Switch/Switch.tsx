import "./switch.scss";

export default function Switch(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const btnClass = props.checked ? "switch on" : "switch";

  return (
    <button className={btnClass} onClick={() => props.onChange(!props.checked)}>
      <div className="switch__pin"></div>
    </button>
  );
}
