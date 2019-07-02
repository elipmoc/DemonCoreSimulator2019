import * as b2 from "@akashic-extension/akashic-box2d";
import { CreateParameter } from "../CreateParameter";

export class Driver extends g.Sprite {
    constructor({ scene, box2d }: CreateParameter, src: g.ImageAsset) {
        super({
            scene,
            src,
            width: src.width,
            height: src.height,
            x: g.game.width / 2 + 200,
            y: g.game.height - 280
        });

        const fixtureDef = box2d.createFixtureDef({
            density: 1.0,
            friction: 0.5,
            restitution: 0.3,
            shape: box2d.createRectShape(this.width, this.height - 30)
        });
        const bodyDef = box2d.createBodyDef({
            type: b2.BodyType.Static
        });

        const b2body = box2d.createBody(this, bodyDef, fixtureDef).b2body;
        let ignoreClick = true;
        setTimeout(() => {
            ignoreClick = false;
        }, 1000);

        scene.pointMoveCapture.add((e) => {
            if (e.target && e.target.id == this.id || ignoreClick) return;
            b2body.SetAngle(Math.atan2(this.y - e.point.y - e.startDelta.y, this.x - e.point.x - e.startDelta.x))
        });
        scene.pointDownCapture.add((e) => {
            if (e.target && e.target.id == this.id || ignoreClick) return;
            b2body.SetAngle(Math.atan2(this.y - e.point.y, this.x - e.point.x))
        });

        const Q_KEY = 81;
        const E_KEY = 69;
        let keyCode = 0;
        parent.addEventListener("keydown", e => {
            keyCode = e.keyCode === Q_KEY || e.keyCode === E_KEY ? e.keyCode : 0;
        });

        parent.addEventListener("keyup", e => {
            keyCode = e.keyCode === Q_KEY || e.keyCode === E_KEY ? 0 : e.keyCode;
        });

        this.update.add(() => {
            if (keyCode === Q_KEY)
                b2body.SetAngle(b2body.GetAngle() - 2 * Math.PI / 180);
            if (keyCode === E_KEY)
                b2body.SetAngle(b2body.GetAngle() + 2 * Math.PI / 180);
        })

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