export default function Loading() {
  return (
    <div className="flex flex-wrap gap-4 mt-8 p-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-white rounded-lg w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)]"
        >
          <div className="p-4 flex flex-col gap-4 items-center aspect-square">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="relative w-full h-[80%] bg-gray-200 rounded animate-pulse" />
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
