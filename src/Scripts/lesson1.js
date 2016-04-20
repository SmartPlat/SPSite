$(function () {

    var winWidth = window.innerWidth || document.documentElement.clientWidth;
    var winHeight = window.innerHeight || document.documentElement.clientHeight;
    var gameContainer = document.getElementById("game-container");
    var stageWidth = window.stageWidth || winWidth;
    var stageHeight = window.stageHeight || (winHeight - gameContainer.offsetTop);
    gameContainer.style.height = stageHeight + 'px';
    gameContainer.style.width = stageWidth + 'px';
    window.console = window.console || { log: function () { } };
    init();
    function init() {

        window.console = window.console || { log: function () { } };
        //alert(gameContainer);
        //init stage 'canvas': 1
        var stage = new Hilo.Stage({
            renderType: 1,
            container: gameContainer,
            width: stageWidth,
            height: stageHeight
        });
        stage.enableDOMEvent(Hilo.event.POINTER_START, true);
        console.log('init');
        //start stage ticker
        var ticker = new Hilo.Ticker(60);
        ticker.addTick(stage);
        ticker.addTick(Hilo.Tween);
        ticker.start();

        //init texture atlas
        //        var atlas = new Hilo.TextureAtlas({
        //            image: './images/fish.png',
        //            width: 174,
        //            height: 1512,
        //            frames: {
        //                frameWidth: 174,
        //                frameHeight: 126,
        //                numFrames: 12
        //            },
        //            sprites: {
        //                fish: { from: 0, to: 7 }
        //            }
        //        });


        //create a fish sprite
        //        var fish = new Hilo.Sprite({
        //            frames: atlas.getSprite('fish'),
        //            x: 0,
        //            y: 400,
        //            interval: 6,
        //            timeBased: false,
        //            loop: true,
        //            onUpdate: function () {
        //                if (this.x > stage.width - this.pivotX) {
        //                    this.x = 0;
        //                } else {
        //                    this.x += 1;
        //                }
        //            }
        //        }).addTo(stage);

        //Hilo.TextureAtlas.createSpriteFrames("swim", "0-7", document.getElementById("fish"), 174, 126, true)
        //        var fish = new Hilo.Sprite({
        //            frames: atlas.getSprite('fish'),
        //            x: 0,
        //            y: 450,
        //            scaleX: 0.5,
        //            scaleY:0.5,
        //            alpha: 0.5,
        //            interval: 6,
        //            timeBased: false,
        //            loop: true,
        //            onEnterFrame: function (frameIndex) {
        //                if (this.x > stage.width - this.pivotX) {
        //                    this.x = 0;
        //                } else {
        //                    this.x += 1.5;
        //                }
        //            }
        //        }).addTo(stage);
        //alert(fish);
        var blueRect = new Hilo.DOMElement({
            id: 'blueRect',
            element: Hilo.createElement('div', {
                style: {
                    backgroundColor: '#004eff',
                    position: 'absolute'
                }
            }),
            width: 30, height: 30,
            x: 50, y: 300,
            pivotX: 15, pivotY: 15
        }).addTo(stage);
        Hilo.copy(blueRect, Hilo.drag);
        blueRect.on(Hilo.event.POINTER_START, function (e) {
            if (e.eventTarget) {
                console.log(e.eventTarget, e.stageX, e.stageY);
                alert('Hilo.Tween.paused');
                //Hilo.Tween.paused = !Hilo.Tween.paused;
                //blueRect.startDrag([e.stageX, e.stageY, 30, 30]);
            }
        });
        Hilo.Tween.to(blueRect, { x: 300 }, { time: 4000, loop: true, reverse: true });
        //预加载图片js
        //alert('预加载图片js');
        var queue = new Hilo.LoadQueue();
        queue.add([{ id: 'dj1', size: 100, noCache: true, src: 'images/dj1.png' }, { id: 'dj2', size: 100, noCache: true, src: 'images/dj2.png'}]);
        queue.on('complete', function (e) {
            //console.log('complete:', queue.getLoaded()+'/' + queue.getTotal() );
            //alert(queue.getLoaded() + '/' + queue.getTotal());
            var dj1 = new Hilo.Bitmap({ image: queue.getContent('dj1'), x: 148, y: 400, scaleX: 0.5, scaleY: 0.5, pivotX: 69, pivotY: 69, rect: [0, 0, 138, 138] });
            stage.addChild(dj1);


            Hilo.Tween.to(dj1, { rotation: 360 }, { time: 100, loop: true, reverse: false });
            var dj2 = new Hilo.Bitmap({ image: queue.getContent('dj2'), x: 100, y: 351, scaleX: 0.5, scaleY: 0.5 });
            stage.addChild(dj2);

        });
        queue.start();
    }


});
