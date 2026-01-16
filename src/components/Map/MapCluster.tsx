import { createPathComponent, type LeafletContextInterface } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.markercluster';

// Import marker cluster styles
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export interface MapClusterProps extends L.MarkerClusterGroupOptions {
  children?: React.ReactNode;
}

const createClusterGroup = (props: MapClusterProps, context: LeafletContextInterface) => {
  const instance = new L.MarkerClusterGroup({
    ...props,
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    iconCreateFunction: (cluster) => {
      const count = cluster.getChildCount();
      let bgClass = 'bg-[#006d77]'; // Ocean Blue (< 10)
      let size = 30;

      if (count >= 50) {
        bgClass = 'bg-[#d07d5d]'; // Terra Cotta / Red (> 50)
        size = 50;
      } else if (count >= 10) {
        bgClass = 'bg-[#f6ad55]'; // Warm Yellow (< 50)
        size = 40;
      }

      // Create a div icon with Tailwind classes
      // We use inline styles for dynamic properties where Tailwind is harder to interpolate for exact arbitrary values in HTML string
      const html = `
        <div class="${bgClass} bg-opacity-90 text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-transform hover:scale-110" style="width: ${size}px; height: ${size}px;">
          <span class="text-sm">${count}</span>
        </div>
      `;

      return L.divIcon({
        html: html,
        className: 'custom-marker-cluster border-none bg-transparent', // Remove default Leaflet styles
        iconSize: L.point(size, size),
      });
    },
  });

  return { instance, context: { ...context, layerContainer: instance } };
};

const MapCluster = createPathComponent<L.MarkerClusterGroup, MapClusterProps>(createClusterGroup);

export default MapCluster;
