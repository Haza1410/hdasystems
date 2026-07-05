type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

export default function Counter({ value, prefix = "", suffix = "" }: CounterProps) {
  const decimals = Number.isInteger(value) ? 0 : 1;
  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-GB");

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
