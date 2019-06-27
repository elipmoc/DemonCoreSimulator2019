import { Player } from "../Player";

export function SampleScene() {
    const scene = new g.Scene({
        game: g.game,
        // このシーンで利用するアセットのIDを列挙し、シーンに通知します
        assetIds: ["player", "shot", "se"]
    });
    scene.loaded.add(() => {
        // ここからゲーム内容を記述します

        const player = Player(scene);

        // 画面をタッチしたとき、SEを鳴らします
        scene.pointDownCapture.add(() => {
            (scene.assets["se"] as g.AudioAsset).play();

            // プレイヤーが発射する弾を生成します
            const shot = new g.Sprite({
                scene: scene,
                src: scene.assets["shot"],
                width: (scene.assets["shot"] as g.ImageAsset).width,
                height: (scene.assets["shot"] as g.ImageAsset).height
            });

            // 弾の初期座標を、プレイヤーの少し右に設定します
            shot.x = player.x + player.width;
            shot.y = player.y;
            shot.update.add(() => {
                // 毎フレームで座標を確認し、画面外に出ていたら弾をシーンから取り除きます
                if (shot.x > g.game.width) shot.destroy();

                // 弾を右に動かし、弾の動きを表現します
                shot.x += 10;

                // 変更をゲームに通知します
                shot.modified();
            });
            scene.append(shot);
        });
        scene.append(player);
        // ここまでゲーム内容を記述します
    });
    return scene;
}