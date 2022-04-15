const countRatePrice = (
  rateName: string,
  ratePrice: number,
  duration: number,
): number => {
  let finalPrice = 0;

  switch (rateName) {
    case 'Поминутно':
      finalPrice = (duration / 1000 / 60) * ratePrice;
      break;
    case 'Месячный':
      finalPrice = Math.ceil(duration / 1000 / 60 / 60 / 24 / 30) * ratePrice;

      break;
    case 'Суточный':
      finalPrice = Math.ceil(duration / 1000 / 60 / 60 / 24 / 1) * ratePrice;

      break;
    case 'Недельный':
      finalPrice = Math.ceil(duration / 1000 / 60 / 60 / 24 / 7) * ratePrice;

      break;
    case 'Недельный (Акция!)':
      finalPrice = Math.ceil(duration / 1000 / 60 / 60 / 24 / 7) * ratePrice;

      break;
    case '3 Месяца':
      finalPrice = Math.ceil(duration / 1000 / 60 / 60 / 24 / 90) * ratePrice;

      break;
    case 'Годовой':
      finalPrice = Math.ceil(duration / 1000 / 60 / 60 / 24 / 365) * ratePrice;

      break;
    default:
      finalPrice = ratePrice;

    // no default
  }

  return finalPrice;
};

export default countRatePrice;
