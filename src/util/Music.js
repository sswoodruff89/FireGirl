class Music {
    constructor(options){
        this.music = document.createElement("audio");
        this.name = options.name || "";
        this.artist = options.artist || "";
        this.music.src = options.src;
        this.music.volume = options.volume || 1;
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