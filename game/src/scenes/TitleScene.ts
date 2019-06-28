import { GoButton } from "../entities/GoButton";

export function TitleScene() {
    const scene = new g.Scene({
        game: g.game,
        assetIds: ["go"]
    });

    scene.loaded.add(() => {
        scene.append(new GoButton(scene, scene.assets["go"] as g.ImageAsset));
    })
    return scene;
}