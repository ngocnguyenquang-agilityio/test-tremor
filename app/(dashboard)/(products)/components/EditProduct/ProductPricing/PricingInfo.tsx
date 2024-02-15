"use client";

// Libs
import { Controller, useFormContext } from "react-hook-form";
import { KeyboardEvent } from "react";

// Components
import { Text, Flex, MultiSelect, MultiSelectItem } from "@tremor/react";
import { SelectField, InputField } from "@/components";

// Types
import { SelectOptionData } from "@/types";

// Constants
import {
  TYPE_PRICE,
  TAGS_PRICE,
  DECIMAL_REGEX,
  NUMBER_REGEX,
} from "@/constants";
import { EXCEPT_KEYS } from "@/constants/common";

// Styles
import "@/styles/form.css";

const PricingInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { price, sku } = errors || {};
  const priceErrorMessage = price?.message?.toString() || "";
  const skuErrorMessage = sku?.message?.toString() || "";

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    EXCEPT_KEYS.POSITIVE_DOUBLE.includes(e.key) && e.preventDefault();
  };

  return (
    <div className="w-full p-4 bg-white dark:bg-dark-tremor-primary rounded-lg w-[67%] shadow-box-icon-default pricing-info">
      <Text className="text-primary dark:text-white font-bold text-xl mb-8">
        Pricing
      </Text>
      <Flex className="flex-col items-end">
        <Flex className="items-start flex-col sm:flex-row">
          <Flex className="flex-col">
            <Flex className="flex-col sm:flex-row">
              <Controller
                control={control}
                rules={{
                  pattern: { value: DECIMAL_REGEX, message: "Invalid price" },
                }}
                render={({ field }) => (
                  <div className="w-full mb-2 md:mb-0">
                    <InputField
                      id="edit-quantity"
                      type="number"
                      label="Quantity"
                      onKeyDown={handleOnKeyDown}
                      {...field}
                    />
                    {priceErrorMessage && (
                      <p className="pt-1 text-[11px] xs:text-xs text-red-500">
                        {priceErrorMessage}
                      </p>
                    )}
                  </div>
                )}
                name="price"
              />
              <Controller
                control={control}
                render={({ field }) => (
                  <div className="mx-6 w-full md:max-w-[30%] mb-3 md:mb-0">
                    <SelectField
                      id="usd"
                      placeholder="USD"
                      label="Currency"
                      options={TYPE_PRICE}
                      {...field}
                    />
                  </div>
                )}
                name="currency"
              />
              <Controller
                control={control}
                rules={{
                  pattern: {
                    value: NUMBER_REGEX,
                    message: "Invalid SKU number",
                  },
                }}
                render={({ field }) => (
                  <div className="w-full">
                    <InputField id="edit-sku" label="SKU" {...field} />
                    {skuErrorMessage && (
                      <p className="pt-1 text-[11px] xs:text-xs text-red-500">
                        {skuErrorMessage}
                      </p>
                    )}
                  </div>
                )}
                name="sku"
              />
            </Flex>

            <Controller
              control={control}
              render={({ field: { value, onChange } }) => {
                const convertedValue = value.map(String);
                return (
                  <div className="w-full mb-4 mt-6">
                    <Text className="text-secondary dark:text-white">Tags</Text>
                    <MultiSelect
                      className="select-custom dark:text-white dark:border-light dark:focus:border-white"
                      value={convertedValue}
                      onValueChange={onChange}>
                      {TAGS_PRICE.map((item: SelectOptionData) => (
                        <MultiSelectItem key={item.value} value={item.value}>
                          {item.option}
                        </MultiSelectItem>
                      ))}
                    </MultiSelect>
                  </div>
                );
              }}
              name="tags"
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default PricingInfo;
