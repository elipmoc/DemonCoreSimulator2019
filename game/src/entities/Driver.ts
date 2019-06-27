import * as b2 from "@akashic-extension/akashic-box2d";
import { CreateParameter } from "../CreateParameter";

export class Driver extends g.Sprite {
    constructor({ scene, box2d }: CreateParameter, src: g.ImageAsset) {
        super({
            scene,
            src,
            width: src.width,
            height: src.height,
            x: g.game.width / 2 + 100,
            y: g.game.height - 280
        });

        const fixtureDef = box2d.createFixtureDef({
            density: 1.0,
            friction: 0.5,
            restitution: 0.6,
            shape: box2d.createRectShape(this.width, this.height - 25)
        });
        const bodyDef = box2d.createBodyDef({
            type: b2.BodyType.Static
        });

        const b2body = box2d.createBody(this, bodyDef, fixtureDef).b2body;
        this.touchable = true;
        this.pointUp.add(() => { b2body.SetType(b2.BodyType.Dynamic); });
        this.pointMove.add(({ prevDelta }) => {
            b2body.SetType(b2.BodyType.Static);
            this.x += prevDelta.x;
            this.y += prevDelta.y;
            b2body.SetPosition(box2d.vec2(this.x + this.width / 2, this.y + this.height / 2));
        });

    }
}