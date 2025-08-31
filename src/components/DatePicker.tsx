import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";

import { Colors } from "../assets/colors";

type Props = {
  selected: Date;
  onChange: (date: Date | null) => void;
};

export const CustomDatePicker = ({ selected, onChange }: Props) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
        <MdDateRange size={25} color={Colors.primary} />
      </div>
      <DatePicker
        selected={selected}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full pl-10 pr-3 py-2.5"
        placeholderText="Seleccionar fecha"
        dateFormat="dd-MM-yyyy"
      />
    </div>
  );
};

