import GameObject from "../GameObject";
import Collision from "../../util/Collision";
import Sound from "../../util/Sound";

const CONSTANTS = {
    GRAVITY: 0.8,
    FRICTION: 2.5,
    MAX_VEL: 50
};


class Impact extends GameObject {
    constructor(options) {
        super(options);
        this.impact = this.loadImage(options.image);
        // this.impact = ;


        this.frameStartX = options.frameStartX;
        this.frameStartY = options.frameStartY;
        this.frameWidth = options.frameWidth;
        this.frameHeight = options.frameHeight;
        this.frameNum = options.frameNum;
        this.done = false;
        this.frameCountOffset = options.frameCountOffset;
        this.launchSound = new Sound(Sound.fire());
        this.frameCount = 0;
        // this.impactSound = new Sound({ src: this.mapKeys[this.screen].theme });



        this.loadImage = this.loadImage.bind(this);

        this.drawImpact = this.drawImpact.bind(this);
        // this.launchSound.play();
        setTimeout(() => {
            this.done = true;
        }, 350)
    }


    // startFrameCount() {
    //     this.impactInterval = setInterval(() => {
    //         this.frameCount++;
    //     }, 1000 / 30);
    //     // }, 5000)
    // }
   

    loadImage(image) {
        let impact = new Image();
        impact.src = image;
        return impact;
    }

    drawImpact(ctx, frameCount) {
        if (this.done) return;

        if (this.frameCount === 0) {
            this.launchSound.play();
        }
        this.frameCount++;

        ctx.drawImage(
            this.impact,
            (Math.floor(this.frameCount / 2.5) % 9) * this.frameWidth,
            this.frameStartY,
            this.frameWidth,
            this.frameHeight,
            this.x - (this.width / 2), this.y + this.height - (this.height / 2),
            this.width, this.height
        );
    }


    static explosion(pos) {
        return {
            name: "explosion",
            pos: pos,
            width: 160,
            height: 160,
            frameStartX: 0,
            frameStartY: 0,
            frameWidth: 75,
            frameHeight: 75,
            frameNum: 9,
            volume: 1.3,
            image: "./assets/burst2.png",
        };
    }

}

export default Impact;

// const fireball = {
//   name: "fireball"
// }


// };