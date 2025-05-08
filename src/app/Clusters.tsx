import { memo } from "react";

const Clusters = () => {
  return (
    <div className="w-full h-[575px] overflow-hidden">
      <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%', height: '125%' }}>
        <iframe 
          src="/pokemon_flavor_clusters_labeled.html"
          style={{ width: '100%', height: '100%', border: 'none', margin: 'auto', paddingLeft: 32 }}
        />
      </div>
    </div>
  );
};

export default memo(Clusters);
