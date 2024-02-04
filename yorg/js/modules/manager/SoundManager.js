
class SoundManager {
    constructor(root) {
        this.root = root;
        this.loadSounds();
        this.currentBackgroundState = "normal"
        this.playedBuildingSoundThisFrame = false;
        this.howlerIsMuted = false;
        this.currentBackgroundRate = 1;
        this.backgroundMuteState = false;
        this.numSfxStartedThisFrame = 0;
        this.soundsMuted = this.root.persistent.getBool("soundsMuted", false);
        this.musicMuted = this.root.persistent.getBool("musicMuted", false);
        Howler.autoSuspend = false;
        this.initSignals();
    }

    initSignals() {
        const { signals } = this.root;

        const playSoundOnSignal = (signal, sound) => {
            signal.add(() => {
                if (!this.soundsMuted) {
                    sound.play();
                }
            });
        };

        [
            [signals.uiActionPerformed, this.buttonClickSound],
            [signals.uiActionPerformedAndFailed, this.buttonFailSound],
            [signals.gameLoadedAndStarted, this.buttonClickSound],
            [signals.uiSkillMarkedForLevelUp, this.buildingPlacedSound],
            [signals.uiNotificationDialogOpened, this.notificationSound],
        ].forEach(([signal, sound]) => playSoundOnSignal(signal, sound));

        signals.buildingPlaced.add(() => {
            if (!this.playedBuildingSoundThisFrame) {
                this.playedBuildingSoundThisFrame = true;
                this.playWorldSpace(this.buildingPlacedSound);
            }
        });

        signals.buildingDestroyed.add((building) => {
            this.playSFX(this.buildingDestroyedSound, building.x, building.y);
        });

        signals.gameLoadedAndStarted.add(() => {
            Object.values(this.backgroundSounds).forEach((backgroundSound) => {
                backgroundSound.play();
            });
        });

        signals.gameOver.add(() => {
            Howler.mute(true);
            Object.values(this.backgroundSounds).forEach((backgroundSound) => {
                backgroundSound.mute(true);
            });
        });

        signals.consistentGameUpdate.add(this.update, this);

        // WTF is this?
        const originalCloseDialog = window.closeDialog;
        window.closeDialog = (t, a) => {
            if (originalCloseDialog) {
                originalCloseDialog(t);
            }
            return !a && !this.soundsMuted && this.buttonClickSound.play(), true;
        };

        this.root.signals.gameFocusChanged.add(this.update, this);
    }

    toggleSounds() {
        (this.soundsMuted = !this.soundsMuted), this.root.persistent.setBool("soundsMuted", this.soundsMuted);
    }

    toggleMusic() {
        (this.musicMuted = !this.musicMuted), this.root.persistent.setBool("musicMuted", this.musicMuted);
    }

    playCannonExplosion(e, t) {
        this.playSFX(this.cannonExplosionSound, e, t);
    }

    playLightningSound(e, t) {
        this.playSFX(this.lightningSound, e, t);
    }

    playArrowSound(e, t) {
        this.playSFX(this.arrowSound, e, t);
    }

    playZombieHitSound() {
        Config.gameTimeSpeedUpFactor;
    }

    playZombieBossHitSound(e, t) {
        this.playSFX(this.zombieBossAttackSound, e, t);
    }

    playCreeperExplosion(e, t) {
        this.playSFX(this.creeperExplosionSound, e, t);
    }

    playUpgradeBuildingSound() {
        this.playWorldSpace(this.buildingPlacedSound);
    }

    playSFX(e, t, i) {
        if (!this.soundsMuted && this.numSfxStartedThisFrame < MAX_SOUNDS_PER_FRAME) {
            var a = this.root.phaser.camera.view, o = this.root.zoom.currentZoomLevel, n = [t / o, i / o], r = [a.x + a.width / 2, a.y + a.height / 2], s = (1 / o) * ((1 - Math.min(1, Math.abs(n[0] - r[0]) / a.width)) * (1 - Math.min(1, Math.abs(n[1] - r[1]) / a.height))) * e.volume();
            if (s < 0.01) return;
            this.numSfxStartedThisFrame += 1;
            var l = e.play();
            e.volume(s, l);
        }
    }

    playWorldSpace(e) {
        if (!this.soundsMuted) {
            var t = 1 / this.root.zoom.currentZoomLevel, i = e.play();
            e.volume(i, t * e.volume());
        }
    }

    playZombieSound() { }

    playCollectGemSound() { }

    playErrorNotification() {
        this.soundsMuted || this.errorNotification.play();
    }

    playSuccessNotification() {
        this.soundsMuted || this.notificationSound.play();
    }

    playMapNotificationSound() {
        this.soundsMuted || this.mapNotificationSound.play();
    }

    update() {
        var e = "normal";
        if (((this.numSfxStartedThisFrame = 0),
            (this.playedBuildingSoundThisFrame = false),
            this.root.daytime.isNight() && (e = "night"),
            this.root.entityMgr.getAllEntitiesWithComponent(BossComponent).length > 0 && (e = "boss"),
            e !== this.currentBackgroundState)) {
            console.log("[SOUND] State changed to", e),
                this.backgroundSounds[this.currentBackgroundState].fade(1, 0, 2e3),
                (this.currentBackgroundState = e),
                this.backgroundSounds[this.currentBackgroundState].fade(0, 1, 2e3);
        }
        var t = false;
        if ((this.root.focus.isVisibleAndFocused() || (t = true),
            (this.root.adRunning || this.root.externalAdRunning) && (t = true),
            t !== this.howlerIsMuted && ((this.howlerIsMuted = t), Howler.mute(t)),
            this.musicMuted !== this.backgroundMuteState))
            for (var i in ((this.backgroundMuteState = this.musicMuted), this.backgroundSounds)) this.backgroundSounds[i].mute(this.musicMuted);
        var a = 1;
        Config.gameTimeSpeedUpFactor > 1 && !Config.tutorialActive && (a = 1.6),
            a !== this.currentBackgroundRate && ((this.currentBackgroundRate = a), this.backgroundSounds.normal.rate(a), this.cannonExplosionSound.rate(a), this.lightningSound.rate(a));
    }

    loadSounds() {
        const rootPath = 'js/modules/manager/sounds'

        this.buildingPlacedSound = new Howl({ src: [`${rootPath}/buildingPlaced.mp3`] });
        this.buttonClickSound = new Howl({ src: [`${rootPath}/buttonClick.mp3`] });
        this.buttonFailSound = new Howl({ src: [`${rootPath}/buttonFail.mp3`] });
        this.buildingDestroyedSound = new Howl({ src: [`${rootPath}/buildingDestroyed.mp3`], volume: 0.5 });
        this.cannonExplosionSound = new Howl({ src: [`${rootPath}/cannonExplosion.mp3`], volume: 0.7 });
        this.arrowSound = new Howl({ src: [`${rootPath}/arrowSound.mp3`], volume: 0.4 });
        this.lightningSound = new Howl({ src: [`${rootPath}/lightningSound.mp3`], volume: 0.3 });
        this.mapNotificationSound = new Howl({ src: [`${rootPath}/mapNotification.mp3`] });
        this.zombieBossAttackSound = new Howl({ src: [`${rootPath}/zombieBossAttack.mp3`], volume: 0.2 });
        this.creeperExplosionSound = new Howl({ src: [`${rootPath}/creeperExplosion.mp3`] });
        this.notificationSound = new Howl({ src: [`${rootPath}/notification.mp3`] });
        this.errorNotification = new Howl({ src: [`${rootPath}/errorNotification.mp3`] });
          
        this.backgroundSounds = {
            normal: new Howl({ src: [`${rootPath}/background.mp3`], loop: true, autoplay: false, html5: true, preload: false }),
            boss: new Howl({ src: [`${rootPath}/background_boss.mp3`], loop: true, autoplay: false, html5: true, preload: false, volume: 0 }),
            night: new Howl({ src: [`${rootPath}/background_night.mp3`], loop: true, autoplay: false, html5: true, preload: false, volume: 0 }),
        };
    }
}

export default SoundManager;
