class Sound {
    constructor(options) {
        this.sound = document.createElement("audio");
        this.sound.src = options.src;
        this.sound.id = options.idName;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("muted", "false");

        this.sound.volume = options.volume || 0.2;

        this.sound.style.display = "none";

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.mute = this.mute.bind(this);
    };

    play() {
        this.sound.play();
    }

    pause() {
        this.sound.pause();
    }

    mute() {
        this.sound.muted = !this.sound.muted;
    }

    static fire() {
        return {
            src: "./assets/Sound/fireSound.mp3",
            idName: "fire"
        }
    }
    static shock() {
        return {
            src: "./assets/Sound/shock.mp3",
            idName: "shock"
        }
    }

    static whoosh() {
        return {
            src: "./assets/Sound/swoosh2.mp3",
            idName: "whoosh",
            volume: .8
        }
    }

    static healItem() {
        return {
            src: "./assets/Sound/heal.mp3",
            idName: "healItem"
        }
    }
    static shieldItem() {
        return {
            src: "./assets/Sound/shieldItem.wav",
            idName: "shieldItem"
        }
    }
}



export default Sound;