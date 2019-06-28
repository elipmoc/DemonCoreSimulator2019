import { GoButton } from "../ui_parts/GoButton";
import { Title } from "../ui_parts/Title";
import { VersionText } from "../ui_parts/VersionText";

export function TitleScene() {
    const scene = new g.Scene({
        game: g.game,
        assetIds: ["go", "title"],
    });

    scene.loaded.add(() => {
        scene.append(new GoButton(scene, scene.assets["go"] as g.ImageAsset));
        scene.append(new Title(scene, scene.assets["title"] as g.ImageAsset));
        scene.append(new VersionText(scene));
    })
    return scene;
}