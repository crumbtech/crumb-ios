export const formatPhoneNumber = (inputValue) => {
  const stripped = inputValue.replace(/\D/g, '');
  const trimmed = stripped.substring(0, 11);
  const length = trimmed.length;
  const countryCode = trimmed.substring(0, 1);
  const areaCode = trimmed.substring(1, 4);
  const numberPart1 = trimmed.substring(4, 7);
  const numberPart2 = trimmed.substring(7, 11);

  let res = '';
  if (length === 0) {
    res = '';
  } else if (countryCode && areaCode && numberPart1 && numberPart2) {
    res = `+${countryCode} (${areaCode}) ${numberPart1} - ${numberPart2}`;
  } else if (countryCode && areaCode && numberPart1) {
    res = `+${countryCode} (${areaCode}) ${numberPart1}`;
  } else if (countryCode && areaCode) {
    res = `+${countryCode} (${areaCode}`;
  } else if (countryCode) {
    res = `+${countryCode}`;
  }

  return res;
};
