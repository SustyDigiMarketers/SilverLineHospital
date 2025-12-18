import React, { useContext } from 'react';
import EditableText from './MasterSetup/EditableText';
import { useCountUp } from '../hooks/useCountUp';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';

const getNestedObjectValue = (obj: any, path: string): any => {
  if (!path || typeof path !== 'string') return undefined;
  // REGEX to handle array accessors like 'slides[0]'
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = obj;
  for (const key of keys) {
    if (result === null || result === undefined) {
      return undefined;
    }
    result = result[key];
  }
  return result;
};

// Data for the statistics to be displayed
const statsData = [
  { configKey: 'experience', defaultValue: 'Experience', endValue: 15, suffix: '+' },
  { configKey: 'trusted', defaultValue: 'Trusted People', endValue: 25, suffix: 'k+' },
  { configKey: 'surgeries', defaultValue: 'Surgeries', endValue: 10, suffix: 'k+' },
  { configKey: 'successRate', defaultValue: 'Success Rate', endValue: 98, suffix: '%' },
];

// A sub-component to render and animate a single statistic.
const StatCounter: React.FC<{ stat: typeof statsData[0] }> = ({ stat }) => {
    const { count, ref } = useCountUp(stat.endValue);
    
    return (
        <div className="text-center">
            <span ref={ref} className="text-5xl font-bold tracking-tighter">
                {count}{stat.suffix}
            </span>
            <EditableText 
                as="p" 
                configKey={`statsBar.${stat.configKey}.label`}
                defaultValue={stat.defaultValue}
                className="mt-2 text-lg text-gray-300" 
            />
        </div>
    );
};

// The main StatsBar component
const StatsBar: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const bgImageRef = config.statsBar?.bg || '';
  const bgImage = getNestedObjectValue(config, bgImageRef) || '';

  return (
    <section 
      id="stats-bar" 
      className="relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
                {statsData.map((stat) => (
                    <StatCounter key={stat.configKey} stat={stat} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default StatsBar;