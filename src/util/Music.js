class Music {
    constructor(options){
        this.music = document.createElement("audio");
        this.music.src = options.src;
        this.music.id = "theme";
        this.music.setAttribute("preload", "auto");
        this.music.setAttribute("controls", "none");
        this.music.setAttribute("loop", "true");
        this.music.setAttribute("muted", "false");
        this.music.style.display = "none";

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.mute = this.mute.bind(this);
    };

    play() {
        debugger
        this.music.play();
    }
    pause() {
        this.music.pause();
    }

    mute() {
        this.music.muted =!this.music.muted;
    }

}

export default Music;