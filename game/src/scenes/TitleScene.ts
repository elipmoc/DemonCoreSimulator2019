import { GoButton } from "../entities/GoButton";
import { Title } from "../entities/Title";

export function TitleScene() {
    const scene = new g.Scene({
        game: g.game,
        assetIds: ["go", "title"],
    });

    scene.loaded.add(() => {
        scene.append(new GoButton(scene, scene.assets["go"] as g.ImageAsset));
        scene.append(new Title(scene, scene.assets["title"] as g.ImageAsset));
    })
    return scene;
}