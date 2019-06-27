import { Exp } from "../entities/Exp";

export function EndScene() {
    const scene = new g.Scene({
        game: g.game,
        assetIds: ["exp"]
    });

    scene.loaded.add(() => {
        scene.append(new Exp(scene, scene.assets["exp"] as g.ImageAsset));
    })
    return scene;
}