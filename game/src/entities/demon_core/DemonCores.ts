import { DemonCore } from "./DemonCore";
import { CreateParameter } from "../../CreateParameter";
import { EndScene } from "../../scenes/EndScene";

export class DemonCores extends g.E {

    private lowerDemonCore: DemonCore;
    private upperDemonCore: DemonCore;
    constructor(createParameter: CreateParameter, src: g.ImageAsset, seSrc: g.AudioAsset) {
        super({ scene: createParameter.scene });
        this.lowerDemonCore = new DemonCore(createParameter, src, { scaleX: 1, scaleY: 1, y: 350 });
        this.upperDemonCore = new DemonCore(createParameter, src, { scaleX: 0.7, scaleY: -0.7, y: 130 });
        this.append(this.lowerDemonCore);
        this.append(this.upperDemonCore);

        this.update.add(() => {
            if (
                (Math.abs(this.upperDemonCore.angle - this.lowerDemonCore.angle) % 360) < 0.1
                && Math.abs(
                    this.upperDemonCore.y + Math.cos(Math.PI * this.upperDemonCore.angle / 180) * ((this.upperDemonCore.srcHeight - 100 * (1 - Math.abs(this.upperDemonCore.scaleY))))
                    - this.lowerDemonCore.y
                ) < 1
            ) {
                seSrc.play();
                g.game.replaceScene(EndScene());
            }
        });
    }

    GetCritical() {
        return (Math.abs(this.upperDemonCore.angle - this.lowerDemonCore.angle) % 360) +
            Math.abs(
                this.upperDemonCore.y + Math.cos(Math.PI * this.upperDemonCore.angle / 180) * ((this.upperDemonCore.srcHeight - 100 * (1 - Math.abs(this.upperDemonCore.scaleY))))
                - this.lowerDemonCore.y
            );

    }
} 
