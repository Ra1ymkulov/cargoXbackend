interface IGenerateTrackCodeProps {
  trackCodeOrders: string[];
}
export const generateTrackCode = ({
  trackCodeOrders,
}: IGenerateTrackCodeProps) => {
  const prefix = "TN";
  const suffix = "IP";
  let trackCode = "";
  do {
    const randomNumbers = Math.floor(100000000 + Math.random() * 900000000);
    trackCode = `${prefix}${randomNumbers}${suffix}`;
  } while (trackCodeOrders.includes(trackCode));
  return trackCode;
};
