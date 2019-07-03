import { DemonCore } from "./DemonCore";
import { CreateParameter } from "../../CreateParameter";
import { EndScene } from "../../scenes/EndScene";

export class DemonCores extends g.E {

    private lowerDemonCore: DemonCore;
    private upperDemonCore: DemonCore;
    constructor(createParameter: CreateParameter, src: g.ImageAsset, seSrc: g.AudioAsset) {
        super({ scene: createParameter.scene });
        this.lowerDemonCore = new DemonCore(createParameter, src, { scaleX: 1, scaleY: 1, y: 350 });
        this.upperDemonCore = new DemonCore(createParameter, src, { scaleX: 0.7, scaleY: -0.7, y: -100 });
        this.append(this.lowerDemonCore);
        this.append(this.upperDemonCore);

        this.update.add(() => {
            if (
                this.GetCritical() < 0.1
            ) {
                seSrc.play();
                g.game.replaceScene(EndScene());
            }
        });
    }

    GetCritical() {
        const dx = this.upperDemonCore.CenterX - this.lowerDemonCore.CenterX;
        const dy = this.upperDemonCore.CenterY - this.lowerDemonCore.CenterY;
        const rad = -this.lowerDemonCore.angle * Math.PI / 180;
        const dx2 = dx * Math.cos(rad) - dy * Math.sin(rad);
        const dy2 = dx * Math.sin(rad) + dy * Math.cos(rad);
        return (Math.abs(this.upperDemonCore.angle - this.lowerDemonCore.angle) % 360) + Math.max(0, Math.abs(dx2) - 170) + Math.max(0, Math.abs(dy2) - 1);
    }
} 
