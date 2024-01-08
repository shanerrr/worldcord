"use client";

import { useEffect, useState, useRef } from "react";
import { useModal } from "@worldcord/hooks/use-modal";
import Globe from "react-globe.gl";

export default function Mapbox() {
  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const { onOpen } = useModal();

  useEffect(() => {
    // load data
    fetch("countries.geojson")
      .then((res) => res.json())
      .then(setCountries);

    (globeEl.current as any).controls().autoRotate = true;
    (globeEl.current as any).controls().autoRotateSpeed = 0.35;
  }, []);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      lineHoverPrecision={0}
      polygonsData={countries.features.filter(
        (d: any) => d.properties.ISO_A2 !== "AQ"
      )}
      polygonAltitude={(d) => (d === hoverD ? 0.03 : 0.01)}
      polygonCapColor={(d) =>
        d === hoverD ? "rgba(256, 256, 256, 0.4)" : "rgba(0, 100, 0, 0.15)"
      }
      polygonSideColor={() => "rgba(256, 256, 256, 0.1)"}
      polygonStrokeColor={() => "rgba(256, 256, 256, 0.3)"}
      polygonLabel={({ properties }: any) => {
        return `<b>${properties.ADMIN} (${properties.ISO_A2}):</b> <br />`;
      }}
      onPolygonHover={(d: any) => setHoverD(d)}
      onPolygonClick={({ properties }: any) => {
        onOpen("countryRoute", {
          details: {
            countryName: properties!.BRK_NAME,
            iso_a2: properties!.ISO_A2,
            iso_n3: properties!.ISO_N3,
          },
        });
      }}
      polygonsTransitionDuration={300}
    />
  );
}
