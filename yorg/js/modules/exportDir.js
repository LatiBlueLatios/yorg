import GameTime from "./game/GameTime.js";
import PersistentStorage from "./PersistentStorage.js";
import SaveGameManager from "./manager/SaveGameManager.js";
import GameSettings from "./game/GameSettings.js";
import DialogManager from "./manager/DialogManager.js";
import ZoomManager from "./manager/ZoomManager.js";
import CullManager from "./manager/CullManager.js";
import InputManager from "./manager/InputManager.js";
import GameFocus from "./game/GameFocus.js";
import GameSystemManager from "./game/GameSystemManager.js";
import EntityManager from "./manager/EntityManager.js";
import DaytimeManager from "./manager/DaytimeManager.js";
import WaveManager from "./manager/WaveManager.js";
import OnlineAPI from "./OnlineAPI.js";
import Stats from "./Stats.js";
import PerformanceStats from "./PerformanceStats.js";
import Map from "./Map.js";
import GameLogic from "./game/GameLogic.js";
import ParticleFactory from "./particles/ParticleFactory.js";
import SoundManager from "./manager/SoundManager.js";
import GUI from "./GUI/GUI.js";

const exports = {
    gameTime: GameTime,
    persistentStorage: PersistentStorage,
    saveGameManager: SaveGameManager,
    gameSettings: GameSettings,
    dialogManager: DialogManager,
    zoomManager: ZoomManager,
    cullManager: CullManager,
    inputManager: InputManager,
    gameFocus: GameFocus,
    gameSysManager: GameSystemManager,
    entityManager: EntityManager,
    dayTimeManager: DaytimeManager,
    waveManager: WaveManager,
    onlineAPI: OnlineAPI,
    stats: Stats,
    perfStats: PerformanceStats,
    map: Map,
    gameLogic: GameLogic,
    particleFactory: ParticleFactory,
    soundManager: SoundManager,
    gui: GUI,
}

export default exports;