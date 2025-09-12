interface Props {
  id: string;
  checked: boolean;
  loading?: boolean;

  onChange: (value: boolean) => void;
}

export const ToggleComponent = ({ id, loading, checked, onChange }: Props) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        value=""
        disabled={loading}
        className="sr-only peer"
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
      />
      <div
        className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/60 ${
          loading && "cursor-progress"
        }`}
      ></div>
    </label>
  );
};
