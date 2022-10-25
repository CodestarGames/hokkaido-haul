import StartScene from "../scenes/StartScene";
import TitleScene from "../scenes/TitleScene";
import PlayScene from "../PlayScene";
import GameOverScene from "../scenes/GameOverScene";
import GameCompleteScene from "../scenes/GameCompleteScene";
import OpeningCredits from "../scenes/OpeningCredits";

export const GameRouter = {
    "ControllerScene": {
        key: 'ControllerScene'
    },
    "StartScene":{
        title: "too much volcano",
        stageMusicKey: 'cambombASO8BitMusic',
        stageMusicKeyAlt: 'cambombASOAlt',
        stageBossMusicKey: "bossCambomb",
        key: 'StartScene',
        classConstructor: StartScene
    },
    "TitleScene":{
        title: "too much volcano",
        stageMusicKey: 'cambombASO8BitMusic',
        stageMusicKeyAlt: 'cambombASOAlt',
        stageBossMusicKey: "bossCambomb",
        key: 'TitleScene',
        classConstructor: TitleScene
    },
    "PlayScene": {
        title: "too much volcano",
        stageMusicKey: 'cambombASO8BitMusic',
        stageMusicKeyAlt: 'cambombASOAlt',
        stageBossMusicKey: "bossCambomb",
        key: 'PlayScene',
        classConstructor: PlayScene
    },
    GameOverScene: {
        title: "too much volcano",
        stageMusicKey: 'cambombASO8BitMusic',
        stageMusicKeyAlt: 'cambombASOAlt',
        stageBossMusicKey: "bossCambomb",
        key: 'GameOverScene',
        classConstructor: GameOverScene
    },
    GameCompleteScene: {
        title: "too much volcano",
        stageMusicKey: 'cambombASO8BitMusic',
        stageMusicKeyAlt: 'cambombASOAlt',
        stageBossMusicKey: "bossCambomb",
        key: 'GameCompleteScene',
        classConstructor: GameCompleteScene
    },
    OpeningCreditsScene: {
        title: "too much volcano",
        stageMusicKey: 'cambombASO8BitMusic',
        stageMusicKeyAlt: 'cambombASOAlt',
        stageBossMusicKey: "bossCambomb",
        key: 'OpeningCreditsScene',
        classConstructor: OpeningCredits
    }
}
