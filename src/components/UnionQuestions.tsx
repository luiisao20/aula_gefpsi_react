import { useState, useRef, useEffect } from "react";

type Option = {
  id: number;
  label: string;
};

const leftOptions: Option[] = [
  { id: 1, label: "opcion 1" },
  { id: 2, label: "opcion 2" },
  { id: 3, label: "opcion 3" },
  { id: 4, label: "opcion 4" },
];

const rightOptions: Option[] = [
  { id: 5, label: "opcion 5" },
  { id: 6, label: "opcion 6" },
  { id: 7, label: "opcion 7" },
  { id: 8, label: "opcion 8" },
];

export const UnionQuestions = () => {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [connections, setConnections] = useState<{ from: number; to: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>({});

  // Actualizar posiciones de los elementos
  useEffect(() => {
    if (containerRef.current) {
      const rects: Record<number, { x: number; y: number }> = {};
      containerRef.current
        .querySelectorAll<HTMLElement>("[data-id]")
        .forEach((el) => {
          const id = Number(el.dataset.id);
          const rect = el.getBoundingClientRect();
          rects[id] = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        });
      setPositions(rects);
    }
  }, [connections]);

  const handleLeftClick = (id: number) => {
    // Si ya está conectada, no se puede volver a seleccionar
    const alreadyConnected = connections.some((c) => c.from === id);
    if (!alreadyConnected) {
      setSelectedLeft(id);
    }
  };

  const handleRightClick = (id: number) => {
    if (selectedLeft !== null) {
      const alreadyConnected = connections.some((c) => c.from === selectedLeft);
      if (!alreadyConnected) {
        setConnections((prev) => [...prev, { from: selectedLeft, to: id }]);
      }
      setSelectedLeft(null);
    }
  };

  return (
    <div ref={containerRef} className="relative flex justify-between w-[600px] p-4">
      {/* SVG para dibujar las líneas */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {connections.map((c, idx) =>
          positions[c.from] && positions[c.to] ? (
            <line
              key={idx}
              x1={positions[c.from].x - containerRef.current!.getBoundingClientRect().left}
              y1={positions[c.from].y - containerRef.current!.getBoundingClientRect().top}
              x2={positions[c.to].x - containerRef.current!.getBoundingClientRect().left}
              y2={positions[c.to].y - containerRef.current!.getBoundingClientRect().top}
              stroke="black"
              strokeWidth="2"
            />
          ) : null
        )}
      </svg>

      {/* Opciones izquierda */}
      <div className="flex flex-col gap-4">
        {leftOptions.map((opt) => {
          const alreadyConnected = connections.some((c) => c.from === opt.id);
          return (
            <div
              key={opt.id}
              data-id={opt.id}
              onClick={() => handleLeftClick(opt.id)}
              className={`p-2 rounded cursor-pointer ${
                alreadyConnected
                  ? "bg-gray-300 cursor-not-allowed"
                  : selectedLeft === opt.id
                  ? "bg-blue-200"
                  : "bg-gray-100"
              }`}
            >
              {opt.label}
            </div>
          );
        })}
      </div>

      {/* Opciones derecha */}
      <div className="flex flex-col gap-4">
        {rightOptions.map((opt) => (
          <div
            key={opt.id}
            data-id={opt.id}
            onClick={() => handleRightClick(opt.id)}
            className="p-2 rounded cursor-pointer bg-gray-100 hover:bg-green-200"
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};
