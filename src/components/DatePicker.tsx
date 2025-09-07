import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

type Props = {
  selected: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
};

export const CustomDatePicker = ({ selected, onChange }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker
          value={selected}
          ampm={false}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full pl-10 pr-3 py-2.5"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
