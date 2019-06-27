import { DemonCore } from "./DemonCore";
import { CreateParameter } from "../../CreateParameter";
import { EndScene } from "../../scenes/EndScene";

export class DemonCores extends g.E {
    constructor(createParameter: CreateParameter, src: g.ImageAsset, seSrc: g.AudioAsset) {
        super({ scene: createParameter.scene });
        const lowerDemonCore = new DemonCore(createParameter, src, { scaleX: 1, scaleY: 1, y: 350 });
        const upperDemonCore = new DemonCore(createParameter, src, { scaleX: 0.7, scaleY: -0.7, y: 130 });
        this.append(lowerDemonCore);
        this.append(upperDemonCore);

        this.update.add(() => {
            if (
                Math.abs(upperDemonCore.angle - lowerDemonCore.angle) < 0.1
                && Math.abs(upperDemonCore.y + upperDemonCore.srcHeight - 30 - lowerDemonCore.y) < 1
            ) {
                seSrc.play();
                g.game.replaceScene(EndScene());
            }
        });
    }
} 
