import WorldMap from 'react-svg-worldmap';

// Country code mapping for different formats
const countryCodeMapping: Record<string, string> = {
  US: 'us',
  USA: 'us',
  RU: 'ru',
  RUS: 'ru',
  CN: 'cn',
  CHN: 'cn',
  IN: 'in',
  IND: 'in',
  BR: 'br',
  BRA: 'br',
  DE: 'de',
  DEU: 'de',
  GER: 'de',
  JP: 'jp',
  JPN: 'jp',
  GB: 'gb',
  UK: 'gb',
  GBR: 'gb',
  FR: 'fr',
  FRA: 'fr',
  IT: 'it',
  ITA: 'it',
  CA: 'ca',
  CAN: 'ca',
  AU: 'au',
  AUS: 'au',
  MX: 'mx',
  MEX: 'mx',
  KR: 'kr',
  KOR: 'kr',
  ES: 'es',
  ESP: 'es',
  NL: 'nl',
  NLD: 'nl',
  SE: 'se',
  SWE: 'se',
  CH: 'ch',
  CHE: 'ch',
  NO: 'no',
  NOR: 'no',
  PL: 'pl',
  POL: 'pl',
  TR: 'tr',
  TUR: 'tr',
  AR: 'ar',
  ARG: 'ar',
  ZA: 'za',
  ZAF: 'za',
  EG: 'eg',
  EGY: 'eg',
  SA: 'sa',
  SAU: 'sa',
  AE: 'ae',
  ARE: 'ae',
  IL: 'il',
  ISR: 'il',
  SG: 'sg',
  SGP: 'sg',
  MY: 'my',
  MYS: 'my',
  TH: 'th',
  THA: 'th',
  ID: 'id',
  IDN: 'id',
  PH: 'ph',
  PHL: 'ph',
  VN: 'vn',
  VNM: 'vn',
  BD: 'bd',
  BGD: 'bd',
  PK: 'pk',
  PAK: 'pk',
  NG: 'ng',
  NGA: 'ng',
  KE: 'ke',
  KEN: 'ke',
  GH: 'gh',
  GHA: 'gh',
  MA: 'ma',
  MAR: 'ma',
  DZ: 'dz',
  DZA: 'dz',
  TN: 'tn',
  TUN: 'tn',
  JO: 'jo',
  JOR: 'jo',
  LB: 'lb',
  LBN: 'lb',
  IQ: 'iq',
  IRQ: 'iq',
  IR: 'ir',
  IRN: 'ir',
  AF: 'af',
  AFG: 'af',
  UZ: 'uz',
  UZB: 'uz',
  KZ: 'kz',
  KAZ: 'kz',
  UA: 'ua',
  UKR: 'ua',
  BY: 'by',
  BLR: 'by',
  MD: 'md',
  MDA: 'md',
  RO: 'ro',
  ROU: 'ro',
  BG: 'bg',
  BGR: 'bg',
  GR: 'gr',
  GRC: 'gr',
  CY: 'cy',
  CYP: 'cy',
  HR: 'hr',
  HRV: 'hr',
  SI: 'si',
  SVN: 'si',
  SK: 'sk',
  SVK: 'sk',
  CZ: 'cz',
  CZE: 'cz',
  HU: 'hu',
  HUN: 'hu',
  AT: 'at',
  AUT: 'at',
  BE: 'be',
  BEL: 'be',
  LU: 'lu',
  LUX: 'lu',
  DK: 'dk',
  DNK: 'dk',
  FI: 'fi',
  FIN: 'fi',
  IE: 'ie',
  IRL: 'ie',
  PT: 'pt',
  PRT: 'pt',
  IS: 'is',
  ISL: 'is',
  MT: 'mt',
  MLT: 'mt',
  LV: 'lv',
  LVA: 'lv',
  LT: 'lt',
  LTU: 'lt',
  EE: 'ee',
  EST: 'ee',
  CL: 'cl',
  CHL: 'cl',
  PE: 'pe',
  PER: 'pe',
  CO: 'co',
  COL: 'co',
  VE: 've',
  VEN: 've',
  EC: 'ec',
  ECU: 'ec',
  BO: 'bo',
  BOL: 'bo',
  PY: 'py',
  PRY: 'py',
  UY: 'uy',
  URY: 'uy',
  GY: 'gy',
  GUY: 'gy',
  SR: 'sr',
  SUR: 'sr',
  NZ: 'nz',
  NZL: 'nz',
  FJ: 'fj',
  FJI: 'fj',
};

/**
 * World map component using react-svg-worldmap
 */
export const CountryWorldMap = ({ data, lineFields, colors }: { data: any[]; lineFields: string[]; colors: string[] }) => {
  // Transform data for react-svg-worldmap format
  const transformedData = data.map((item) => {
    const countryKey = item.keys?.find((key: any) => key.key === 'COUNTRY');
    const countryCode = countryKey?.value || countryKey?.text || '';
    const value = lineFields.length > 0 ? item[lineFields[0]] || 0 : 0;

    // Normalize country code to lowercase
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

      {/* Legend */}
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
