import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { FacilityMapCollection } from '@meditrack/shared';
import { Skeleton } from '../../atoms/Skeleton';
import 'leaflet/dist/leaflet.css';

const STATUS_COLORS: Record<string, string> = {
  ADEQUATE: '#22c55e',
  LOW: '#f59e0b',
  CRITICAL: '#f42828',
  STOCKOUT: '#f42828',
};

interface FacilityMapProps {
  data?: FacilityMapCollection;
  isLoading?: boolean;
}

export function FacilityMap({ data, isLoading }: FacilityMapProps) {
  if (isLoading) {
    return <Skeleton height={320} className="w-full rounded-xl" />;
  }

  if (!data?.features.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-border-default bg-neutral-50 text-sm text-text-secondary">
        No facility data available
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle ring-1 ring-black/[0.04]">
      <MapContainer center={[0.35, 32.55]} zoom={9} className="h-80 w-full" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.features.map((feature) => {
          const [lng, lat] = feature.geometry.coordinates;
          const color = STATUS_COLORS[feature.properties.status] ?? STATUS_COLORS.ADEQUATE;

          return (
            <CircleMarker
              key={feature.properties.id}
              center={[lat, lng]}
              radius={9}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.9, weight: 2 }}
            >
              <Popup>
                <strong>{feature.properties.name}</strong>
                <br />
                Status: {feature.properties.status}
                <br />
                Critical drugs: {feature.properties.criticalDrugs}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <div className="flex flex-wrap gap-4 border-t border-border-subtle bg-neutral-50 px-4 py-2.5 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-status-adequate" /> Adequate
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-status-low" /> Low
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-status-critical" /> Critical
        </span>
      </div>
    </div>
  );
}
