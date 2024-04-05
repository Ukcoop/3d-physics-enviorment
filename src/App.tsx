import { useEffect } from "react";

import graphicsHandler from "./core/graphicsHandler";

export default function App() {
  useEffect(() => {
    let graphics = new graphicsHandler(
      document.getElementById("myThreeJsCanvas")
    );

    graphics.newAmbientLight(0xffffff, 0.5);
    graphics.newSpotLight(0xffffff, 1, [0, 64, 32]);
    graphics.newRect([16, 16, 16], [0, 0, 0], 0x0000ff, "mainCube");

    const animate = () => {
      graphics.objects["mainCube"].rotation.x += 0.01;
      graphics.objects["mainCube"].rotation.y += 0.01;
      graphics.renderFrame();
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <canvas id="myThreeJsCanvas" />
    </>
  );
}
