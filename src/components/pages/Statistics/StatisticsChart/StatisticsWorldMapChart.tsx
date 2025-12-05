import WorldMap from 'react-svg-worldmap';
import { countryCodeMapping } from './StatisticsChart.const';

export const CountryWorldMap = ({ data, lineFields, colors }: { data: any[]; lineFields: string[]; colors: string[] }) => {
  const transformedData = data.map((item) => {
    const countryKey = item.keys?.find((key: any) => key.key === 'COUNTRY');
    const countryCode = countryKey?.value || countryKey?.text || '';
    const value = lineFields.length > 0 ? item[lineFields[0]] || 0 : 0;
    const normalizedCode = countryCodeMapping[countryCode.toUpperCase()] || countryCode.toLowerCase();

    return {
      country: normalizedCode,
      value,
    };
  }).filter(item => item.country && item.value > 0);

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg p-4">

      <div className="h-[400px] w-full flex items-center justify-center">
        <WorldMap
          data={transformedData}
          size="lg"
          color={colors[0] || '#3b82f6'}
          tooltipBgColor="#374151"
          tooltipTextColor="white"
          richInteraction
          borderColor="#d1d5db"
          backgroundColor="transparent"
          strokeOpacity={0.3}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <span>No data</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: colors[0] ? `${colors[0]}40` : '#3b82f640' }}
            >
            </div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: colors[0] || '#3b82f6' }}
            >
            </div>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
