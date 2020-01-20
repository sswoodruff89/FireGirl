class Sound {
    constructor(options) {
        this.sound = document.createElement("audio");
        this.sound.src = options.src;
        this.sound.id = options.idName;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("muted", "false");

        this.sound.volume = 0.2;

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
            id: "fire"
        }
    }
    static shock() {
        return {
            src: "./assets/Sound/shock.mp3",
            id: "shock"
        }
    }
}



export default Sound;