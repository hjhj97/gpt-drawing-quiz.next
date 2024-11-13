export default function Loading() {
  const SKELETON_COUNT = 12;
  const loadingCards = Array.from(
    { length: SKELETON_COUNT },
    (_, index) => index + 1
  );
  return (
    <div className="flex flex-wrap gap-8 mt-8 p-8">
      {loadingCards.map((item) => (
        <LoadingCard key={item} />
      ))}
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="bg-white rounded-lg w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(25%-2rem)]">
      <div className="p-4 flex flex-col gap-4 items-center aspect-square">
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
        <div className="relative w-full h-[80%] bg-gray-200 rounded animate-pulse" />
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
