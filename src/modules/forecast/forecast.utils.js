export function groupTransactionsByMonth(transactions) {
  const map = new Map();

  for (const item of transactions) {
    const date = new Date(item.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!map.has(key)) {
      map.set(key, {
        month: key,
        income: 0,
        expense: 0
      });
    }

    const current = map.get(key);
    const amount = Number(item.amount);

    if (item.type === 'INCOME') {
      current.income += amount;
    } else {
      current.expense += amount;
    }
  }

  return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));
}

export function movingAverage(values, windowSize = 3) {
  if (!values.length) return 0;

  const slice = values.slice(-windowSize);
  const sum = slice.reduce((acc, value) => acc + value, 0);

  return sum / slice.length;
}

export function weightedMovingAverage(values) {
  if (!values.length) return 0;
  if (values.length === 1) return values[0];

  const slice = values.slice(-3);
  const weights = slice.length === 1 ? [1] : slice.length === 2 ? [1, 2] : [1, 2, 3];

  let weightedSum = 0;
  let totalWeight = 0;

  for (let i = 0; i < slice.length; i += 1) {
    weightedSum += slice[i] * weights[i];
    totalWeight += weights[i];
  }

  return weightedSum / totalWeight;
}

export function exponentialSmoothing(values, alpha = 0.5) {
  if (!values.length) return 0;

  let forecast = values[0];

  for (let i = 1; i < values.length; i += 1) {
    forecast = alpha * values[i] + (1 - alpha) * forecast;
  }

  return forecast;
}

export function getForecastByModel(values, model) {
  switch (model) {
    case 'moving_average':
      return movingAverage(values, 3);
    case 'weighted_moving_average':
      return weightedMovingAverage(values);
    case 'exponential_smoothing':
      return exponentialSmoothing(values, 0.5);
    default:
      return movingAverage(values, 3);
  }
}