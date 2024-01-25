"use client";

//Libs
import { useState } from "react";

//Components
import { Card, Text, Flex, Button } from "@tremor/react";

//Types
import { TSalesStatistic } from "@/types";

//Constants
import {
  CURRENCY,
  ITEM_ACTION_SALES_DATE,
  SALES_STATISTIC_TYPE,
  UNIT,
} from "@/constants";

// Helpers
import { formatAdjustNumber, formattedNumber } from "@/helpers";

interface ISalesStatisticProp {
  statisticsData: TSalesStatistic;
}

const SalesStatisticCard = ({
  statisticsData,
}: ISalesStatisticProp): JSX.Element => {
  const { id, type, amount, amountChange, duration, amountChangeType } =
    statisticsData;
  const [isOpenAction, setOpenAction] = useState(false);
  const [currentSalesDate, setCurrentSalesDate] = useState("6 May - 7 May");
  const openActionSalesDate = isOpenAction;

  const handleSelectSalesDate = (labelDate: string) => {
    setOpenAction(false);
    setCurrentSalesDate(labelDate);
  };

  const handleToggleAction = (id: string) => {
    setOpenAction(!isOpenAction);
  };

  const formattedAmount =
    {
      [SALES_STATISTIC_TYPE.SALES]: formattedNumber({
        value: amount,
        currency: CURRENCY.DOLLAR,
      }),
      [SALES_STATISTIC_TYPE.CUSTOMERS]: formattedNumber({
        value: amount,
        isDecimalNumber: true,
      }),
      [SALES_STATISTIC_TYPE.AVG_REVENUE]: formattedNumber({
        value: amount,
        currency: CURRENCY.DOLLAR,
        isDecimalNumber: true,
      }),
    }[type] || "";

  const formattedTotalAmount =
    {
      [SALES_STATISTIC_TYPE.SALES]: formatAdjustNumber({
        value: amountChange,
        isPositive: amountChangeType,
        unit: UNIT.PERCENT,
      }),
      [SALES_STATISTIC_TYPE.CUSTOMERS]: formatAdjustNumber({
        value: amountChange,
        isPositive: amountChangeType,
        unit: UNIT.PERCENT,
      }),
      [SALES_STATISTIC_TYPE.AVG_REVENUE]: formatAdjustNumber({
        value: amountChange,
        isPositive: amountChangeType,
        currency: CURRENCY.DOLLAR,
      }),
    }[type] || "";

  const totalAmountColor =
    type === SALES_STATISTIC_TYPE.AVG_REVENUE ? "text-secondary" : "text-few";

  return (
    <Card className="dark:bg-dark-tremor-primary ring-0 max-w-full p-4 lg:max-w-[356px] 2xl:max-w-full border-none relative rounded-xl shadow-md">
      <Flex className="items-start">
        <Flex className="flex-col w-2/3 md:w-1/2">
          <Flex className="flex-col justify-start items-start">
            <Text className="text-md text-secondary dark:text-dark-romance font-semibold tracking-[0.4px]">
              {type}
            </Text>
            <Text className="text-primary dark:text-dark-primary text-xl leading-[33px] font-bold">
              {formattedAmount}
            </Text>
          </Flex>
        </Flex>
        <Flex
          className="justify-end items-end w-1/3 md:w-1/2 cursor-pointer"
          onClick={() => handleToggleAction(id)}>
          <Text className="!text-xs text-secondary dark:text-secondary leading-[21px] tracking-[0.4px]">
            {currentSalesDate}
          </Text>
        </Flex>
        {openActionSalesDate && (
          <div className="absolute p-2 -right-2 top-8 z-10 bg-white rounded-lg shadow-md">
            {ITEM_ACTION_SALES_DATE.map(item => (
              <Flex key={item.key} flex-col>
                <Button
                  className="w-40 justify-start text-tremor-content-title hover:text-tremor-content-title hover:bg-[#f0f2f5] hover:rounded-md px-4 py-1.5"
                  variant="light"
                  onClick={() => handleSelectSalesDate(item.label)}>
                  <Text className="font-normal text-sm text-secondary hover:text-primary leading-[21px] tracking-[0.13px]">
                    {item.label}
                  </Text>
                </Button>
              </Flex>
            ))}
          </div>
        )}
      </Flex>
      <Flex className="justify-start items-start">
        {amountChange && (
          <Text
            className={`${totalAmountColor} dark:text-few leading-[22px] font-bold`}>
            {formattedTotalAmount}
          </Text>
        )}
        <Text className="ml-1 text-secondary dark:text-dark-romance leading-[21px] tracking-[0.4px]">
          {duration}
        </Text>
      </Flex>
    </Card>
  );
};

export default SalesStatisticCard;