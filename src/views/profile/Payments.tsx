import { FileInput } from "../../components/FileInput";
import { TablePayments } from "../../components/TableComponent";
import type { Payment } from "../../interfaces/Payment";

export const Payments = () => {
  const payments: Payment[] = [
    {
      id: 1,
      date: "20 dic 2023",
      file: "Alpex.jpg",
      url: "https://flowbite.com/docs/components/tables/#checkbox-selection",
      state: true,
    },
    {
      id: 2,
      date: "02 ene 2024",
      file: "Pago 2.jpg",
      url: "https://flowbite.com/docs/components/tables/#checkbox-selection",
      state: true,
    },
    {
      id: 3,
      date: "12 dic 2023",
      file: "Pago.jpg",
      url: "https://flowbite.com/docs/components/tables/#checkbox-selection",
      state: false,
    },
  ];

  return (
    <div className="p-4 rounded-xl bg-white">
      <h1 className="text-center font-bold text-2xl">Sección de pagos</h1>
      <FileInput
        description="para subir tu pago"
        format=".jpeg,.png,.jpg,.pdf"
      />
      {payments.length !== 0 ? (
        <TablePayments payments={payments} />
      ) : (
        <h2 className="my-4 text-center font-semibold text-xl">
          No existen pagos subidos
        </h2>
      )}
    </div>
  );
};
