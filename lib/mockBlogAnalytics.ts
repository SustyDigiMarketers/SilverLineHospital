// --- Mock Data Generation ---

// 1. KPIs
export const getBlogKPIs = () => ({
  totalPosts: 128,
  totalViews: '2.1M',
  avgEngagement: '6.7%',
});

// 2. Post Publication Trends
const generateTrendData = (numPoints: number, scale: number, startValue?: number) => {
  let data = [];
  let value = startValue !== undefined ? startValue : Math.random() * scale / 2 + scale / 2;
  for (let i = 0; i < numPoints; i++) {
    data.push(Math.round(value));
    value += (Math.random() - 0.45) * (scale / (numPoints));
    if (value < 0) value = Math.random() * 5;
  }
  return data;
};

export const getPostTrends = () => ({
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: generateTrendData(7, 5, 2),
  },
  monthly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: generateTrendData(4, 20, 10),
  },
  yearly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: generateTrendData(12, 50, 25),
  },
});


// 3. Viewer Demographics
export const getViewerDemographics = () => ({
  age: {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    data: [22, 35, 25, 12, 6],
  },
  countries: {
    labels: ['USA', 'India', 'UK'],
    data: [45, 25, 10],
  },
  cities: {
    labels: ['New York', 'Mumbai', 'London'],
    data: [15, 12, 8],
  },
});
