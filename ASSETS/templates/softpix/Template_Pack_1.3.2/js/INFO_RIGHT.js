
        let clipNone = "inset(0%   0% 0% 0%)";
        let clipEast = "inset(0% 100% 0% 0%)";
        let clipWest = "inset(0% 0% 0% 100%)";
        let clipSout = "inset(0% 0% 100% 0%)";

        function runTemplateUpdate() {
            console.clear();
            e('DynamicTheme').href = e('f99').innerText;
            e('leftText').innerHTML = htmlDecode(e('f0').innerText);

            if (e('f1').innerText=='none') {
                // no icon
                e('icon').style.display='none';
            } else {
                // show icon
                e('rightInfo').style.paddingRight = '7vw';
                e('icon').style.display='flex';
                const params = {
                    container: e('icon'),
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: e('f1').innerText
                };
                anim = lottie.loadAnimation(params);
                anim.addEventListener('data_ready', () => {
                    anim.goToAndPlay('in1');
                })
            }

            runAnimationIN();
        }

        function runAnimationIN() {
            var timelineIn = anime.timeline({
                easing:   'easeOutCubic',
                duration: 800
            })

            .add({
                targets:    ['#gfx'],
                opacity:    { value: [0,1], easing:'linear', duration: 100},
                translateX: { value: ['20%','0%']},
            },0)

            .add({
                targets:    ['#rightInfo'],
                clipPath:   [clipWest, clipNone],
                opacity:    [0,1],
            },50)
            
            .add({
                targets:    ['#leftText'],
                opacity:    { value: [0,1]},
                translateY: { value: ['-50%','0%'] },
            }, 400)


            ;
        } // runAnimationIN

        function runAnimationOUT() {
            var timelineIn = anime.timeline({
                easing:   'easeInCubic',
                duration: 400
            })

            .add({
                targets:    ['#leftText'],
                translateX: '-20%',
                opacity:    { value: 0, duration: 100, delay: 300},
            }, 0)

            .add({
                targets:    ['#gfx'],
                clipPath:   { value: clipWest, duration: 500},
                opacity:    { value: 0, duration: 200, delay: 400},
            }, 0)
            ;
        } // runAnimationOUT

        window.SPXGCTemplateDefinition = {
            "description": "Top right with icon",
            "playserver": "OVERLAY",
            "playchannel": "1",
            "playlayer": "8",
            "webplayout": "8",
            "out": "3000",
            "dataformat": "json",
            "uicolor": "3",
            "DataFields": [
                {
                    "field" : "comment",
                    "ftype" : "textfield",
                    "title" : "Nickname of this item on the rundown",
                    "value" : "[ Item nickname ]"
                },
                {
                    "ftype" : "instruction",
                    "value" : "This template goes out in 3000 milliseconds by default. Try using emoji in the graphics also."
                },
                {
                    "field" : "f0",
                    "ftype" : "textfield",
                    "title" : "Info text",
                    "value" : "😃 #hashtag"
                },
                {
                    "field": "f1",
                    "ftype": "filelist",
                    "title": "Icon",
                    "assetfolder" : "./lottie/" ,
                    "extension" : "json",
                    "value": "none",
                },
                {
                    "field": "f99",
                    "ftype": "filelist",
                    "title": "Visual theme",
                    "assetfolder" : "./themes/" ,
                    "extension" : "css",
                    "value": "./themes/Default.css",
                }  

            ]
        };
