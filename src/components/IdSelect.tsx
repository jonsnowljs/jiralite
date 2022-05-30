import { Select } from "antd";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

// use React.componentProps get all the typeof Select, and use extends to inheritance it use omit to skip those self designed types
interface IdSelectProps
  extends Omit<
    SelectProps,
    "value" | "onChange" | "defaultOptionName" | "options"
  > {
  value?: Raw | undefined | null;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value can accept multiple types
 * when value change, only number | undefined is returned
 * when isNaN(Number(value)) is true,  means default type is chosen. isNaN(Number(value)) means if the value can be converted to number
 * when default type is chosen, onChange will return undefined
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

// if value isNaN covert to 0 or convert to number of value
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
