import portfolioData from '@/lib/portfolio-data.json';

export type PortfolioMetric = { label: string; value: string };

export type PortfolioProject = {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  website?: string;
  /** Add the verified service categories for this project in portfolio-data.json. */
  services?: string[];
  summary?: string;
  results?: PortfolioMetric[];
};

// Add projects in portfolio-data.json. Optional fields look like:
// "summary": "A short approved project description.",
// "results": [{ "value": "+32%", "label": "qualified organic enquiries" }]
const categoryPriority = [
  'Business Services', 'Industrial', 'Health', 'Dentistry', 'Education', 'IT & Software',
  'Home Improvement', 'Automotive', 'Cleaning Service', 'Real Estate', 'Fashion & Beauty',
  'Finance', 'Hotel & Restaurant', 'Designer & Architect', 'Photography', 'Fitness',
  'Shopping', 'Sports', 'Entertainment', 'Web Hosting', 'Telecommunication', 'Other',
];

export const portfolioProjects = (portfolioData as PortfolioProject[]).map((project) => ({
  ...project,
  services: [...new Set([...(project.services ?? []), 'SEO'])],
})).slice().sort((left, right) => {
  const leftPriority = categoryPriority.indexOf(left.category);
  const rightPriority = categoryPriority.indexOf(right.category);
  return (leftPriority < 0 ? categoryPriority.length : leftPriority) - (rightPriority < 0 ? categoryPriority.length : rightPriority);
});
