const flavorToColor: Record<string, string> = {
  sweet: "#96E7E7",
  sour: "#F7F765",
  bitter: "#8D96FF",
  spicy: "#F7AEA6",
  dry: "#D77DFF",
};

const FlavorTag = ({ flavor }: { flavor: string }) => {
  function formatName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return (
    <div
      className="flex border-2 border-gray-700 rounded-md px-3 py-1 text-center"
      style={{ backgroundColor: flavorToColor[flavor]}}
    >
      {formatName(flavor)}
    </div>
  );
};

export default FlavorTag;
