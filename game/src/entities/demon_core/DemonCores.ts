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
                (Math.abs(upperDemonCore.angle - lowerDemonCore.angle) % 360) < 0.1
                && Math.abs(upperDemonCore.y + Math.cos(Math.PI * upperDemonCore.angle / 180) * ((upperDemonCore.srcHeight - 100 * (1 - Math.abs(upperDemonCore.scaleY)))) - lowerDemonCore.y) < 1
            ) {
                seSrc.play();
                g.game.replaceScene(EndScene());
            }
        });
    }
} 
