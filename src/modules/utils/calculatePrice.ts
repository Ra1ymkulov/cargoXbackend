import { AllService, ServiceType } from "@prisma/client";

interface ICalculatePrice {
  fromCity: AllService;
  toCity: AllService;
  serviceType: ServiceType;
  weightKg: number;
}
export const calculatePrice = ({
  fromCity,
  toCity,
  serviceType,
  weightKg,
}: ICalculatePrice) => {
  return;
};
//dwdwd
