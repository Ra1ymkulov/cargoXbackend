interface IDistanceKm {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}
export const distanceKm = ({ lat1, lat2, lon1, lon2 }: IDistanceKm) => {
  const Radius = 6371;
  const dlat = ((lat2 - lat1) * Math.PI) / 180;
  const dlon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos((lat2 * Math.PI) / 180) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Radius * c;
};
