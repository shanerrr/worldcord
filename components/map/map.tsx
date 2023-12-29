"use client";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import "mapbox-gl/dist/mapbox-gl.css";

export default function Mapbox() {
  const router = useRouter();
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<null | mapboxgl.Map>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/shanerr/clqq0n1s500bu01rj25vf2egf",
    });

    map.current.on("style.load", () => {
      map.current?.setFog({
        color: "rgb(186, 210, 235)", // Lower atmosphere
        "high-color": "rgb(255, 255, 223)", // Upper atmosphere
        "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        "space-color": "rgb(12, 10, 9)", // Background color
        "star-intensity": 0, // Background star brightness (default 0.35 at low zoooms )
      }); // Set the default atmosphere style
    });

    map.current.on("load", () => {
      map.current?.addSource("countries", {
        // country-boundaries-simplified
        type: "geojson",
        data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson",
      });

      map.current?.addLayer({
        id: "cf", // country-fills
        type: "fill",
        source: "countries",
        layout: {},
        paint: {
          "fill-color": "#627BC1",
          "fill-opacity": 0.1,
        },
      });

      map.current?.addLayer({
        id: "cb", // country borders
        type: "line",
        source: "countries",
        layout: {},
        paint: {
          "line-color": "#000000",
          "line-width": 0.5,
        },
      });

      map.current?.addLayer({
        id: "cfh", // country-fills-hover",
        type: "fill",
        source: "countries",
        layout: {},
        paint: {
          "fill-color": "#000000",
          "fill-opacity": 0.1,
        },
        filter: ["==", "name", ""],
      });

      // When the user moves their mouse over the page, we look for features
      // at the mouse position (e.point) and within the states layer (states-fill).
      // If a feature is found, then we'll update the filter in the state-fills-hover
      // layer to only show that state, thus making a hover effect.
      map.current?.on("mousemove", function (e) {
        var features = map.current!.queryRenderedFeatures(e.point, {
          layers: ["cf"],
        });

        if (features.length) {
          map.current!.getCanvas().style.cursor = "pointer";
          map.current?.setFilter("cfh", [
            "==",
            "name",
            features[0].properties!.name,
          ]);
        } else {
          map.current?.setFilter("cfh", ["==", "name", ""]);
          map.current!.getCanvas().style.cursor = "";
        }
      });

      // Reset the state-fills-hover layer's filter when the mouse leaves the map
      map.current?.on("mouseout", function () {
        map.current!.getCanvas().style.cursor = "auto";
        map.current?.setFilter("cfh", ["==", "name", ""]);
      });

      map.current?.on("click", function (e) {
        var features = map.current!.queryRenderedFeatures(e.point, {
          layers: ["cf"],
        });
        if (features.length) {
          // brk_name
          //iso_a3

          router.push(`/servers/${features[0].properties!.iso_n3}`);
        }
      });
    });

    // // The following values can be changed to control rotation speed:

    // // At low zooms, complete a revolution every two minutes.
    // const secondsPerRevolution = 120;
    // // Above zoom level 5, do not rotate.
    // const maxSpinZoom = 5;
    // // Rotate at intermediate speeds between zoom levels 3 and 5.
    // const slowSpinZoom = 3;

    // let userInteracting = false;
    // let spinEnabled = true;

    // function spinGlobe() {
    //   const zoom = map.current!.getZoom();
    //   if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    //     let distancePerSecond = 360 / secondsPerRevolution;
    //     if (zoom > slowSpinZoom) {
    //       // Slow spinning at higher zooms
    //       const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
    //       distancePerSecond *= zoomDif;
    //     }
    //     const center = map.current!.getCenter();
    //     center.lng -= distancePerSecond;
    //     // Smoothly animate the map over one second.
    //     // When this animation is complete, it calls a 'moveend' event.
    //     map.current?.easeTo({ center, duration: 1000, easing: (n) => n });
    //   }
    // }

    // // Pause spinning on interaction
    // map.current.on("mousedown", () => {
    //   userInteracting = true;
    // });

    // // Restart spinning the globe when interaction is complete
    // map.current.on("mouseup", () => {
    //   userInteracting = false;
    //   spinGlobe();
    // });

    // // These events account for cases where the mouse has moved
    // // off the map, so 'mouseup' will not be fired.
    // map.current.on("dragend", () => {
    //   userInteracting = false;
    //   spinGlobe();
    // });
    // map.current.on("pitchend", () => {
    //   userInteracting = false;
    //   spinGlobe();
    // });
    // map.current.on("rotateend", () => {
    //   userInteracting = false;
    //   spinGlobe();
    // });

    // // When animation is complete, start spinning if there is no ongoing interaction
    // map.current.on("moveend", () => {
    //   spinGlobe();
    // });

    // spinGlobe();

    // return () => {
    //   map.current?.remove();
    // };
  }, []);

  return <section ref={mapContainer} className="map-container h-full w-full" />;
}
