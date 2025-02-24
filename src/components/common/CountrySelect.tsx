import { FC } from "react";
import { getCountryCallingCode, CountryCode } from "libphonenumber-js";

interface CountryOption {
    code: CountryCode;
    name: string;
}

interface CountrySelectProps {
    countries: CountryOption[];
    selectedCountry: CountryCode;
    onChange: (value: CountryCode) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ countries, selectedCountry, onChange }) => {
    return (
        <select
            value={selectedCountry}
            onChange={(e) => onChange(e.target.value as CountryCode)}
            className="border border-gray-300 rounded-md p-2"
        >
            {countries.map((country) => (
                <option key={country.code} value={country.code}>
                    {country.name} (+{getCountryCallingCode(country.code)})
                </option>
            ))}
        </select>
    );
};

export default CountrySelect;
