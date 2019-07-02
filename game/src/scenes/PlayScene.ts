import { DemonCores } from "../entities/demon_core/DemonCores";
import * as b2 from "@akashic-extension/akashic-box2d";
import { Floor } from "../entities/Floor";
import { Driver } from "../entities/Driver";
import { CriticalText } from "../ui_parts/CriticalText";
import { Flash } from "../ui_parts/Flash";

export function PlayScene() {
    const scene = new g.Scene({
        game: g.game,
        // このシーンで利用するアセットのIDを列挙し、シーンに通知します
        assetIds: ["demonCore", "driver", "expSe", "flash"]
    });

    const box2d = new b2.Box2D({
        gravity: [0, 9.8],
        scale: 50,
        sleep: false
    });
    scene.loaded.add(() => {
        const demonCores = new DemonCores(
            { scene, box2d },
            scene.assets["demonCore"] as g.ImageAsset,
            scene.assets["expSe"] as g.AudioAsset
        );
        const criticalText = new CriticalText(scene);
        const flash = new Flash(scene, scene.assets["flash"] as g.ImageAsset)
        scene.append(flash);
        scene.append(demonCores);
        scene.append(new Floor({ scene, box2d }));
        scene.append(new Driver({ scene, box2d }, scene.assets["driver"] as g.ImageAsset));
        scene.append(criticalText);
        scene.update.add(() => {
            criticalText.SetValue(demonCores.GetCritical());
            flash.SetLevel(Math.max(0, 1 - demonCores.GetCritical() / 30));
        })
    })
    scene.update.add(() => box2d.step(1 / g.game.fps));
    return scene;
}