import { AllService, ServiceType } from "@prisma/client";
import { distanceKm } from "./distanceKm";

interface ICalculatePrice {
  fromCity: AllService;
  toCity: AllService;
  serviceType: ServiceType;
  weightKg: number;
}
export const separateCosting = ({
  fromCity,
  toCity,
  serviceType,
  weightKg,
}: ICalculatePrice) => {
  const distancekm = distanceKm({
    lat1: fromCity.lat,
    lat2: toCity.lat,
    lon1: fromCity.lon,
    lon2: toCity.lon,
  });
  const price =
    distancekm * serviceType.priceKm + weightKg * serviceType.pricekg;
  return { price, distancekm };
};
