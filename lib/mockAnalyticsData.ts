// --- Mock Data Generation ---

// 1. Visitor Locations
export const getVisitorLocations = () => ({
  countries: {
    labels: ['USA', 'India', 'UK'],
    data: [1200, 850, 450],
  },
  cities: {
    labels: ['New York', 'Mumbai', 'London'],
    data: [600, 400, 250],
  },
});

// 2. Age Demographics
export const getAgeDemographics = () => ({
  labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
  data: [350, 950, 700, 400, 250],
});

// 3. Visit Trends
const generateTrendData = (numPoints: number, scale: number) => {
  let data = [];
  let value = Math.random() * scale / 2 + scale / 2;
  for (let i = 0; i < numPoints; i++) {
    data.push(Math.round(value));
    value += (Math.random() - 0.5) * (scale / (numPoints / 2));
    if (value < 0) value = 0;
  }
  return data;
};

export const getVisitTrends = () => ({
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: generateTrendData(7, 200),
  },
  monthly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: generateTrendData(4, 800),
  },
  yearly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: generateTrendData(12, 3000),
  },
});
