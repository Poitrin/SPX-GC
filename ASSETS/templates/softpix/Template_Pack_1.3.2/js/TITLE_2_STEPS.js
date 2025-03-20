
        // Crop settings
        let clipNone = "inset(  0%    0%    0%    0%)";
        let clipHCen = "inset(  0%   50%    0%   50%)";
        let clipEast = "inset(  0%  100%    0%    0%)";
        let clipWest = "inset(  0%    0%    0%  100%)";
        let clipSout = "inset(  0%    0%  100%    0%)";

        function runTemplateUpdate() {
            console.clear();
            e('DynamicTheme').href = e('f99').innerText;
            e('title1').innerHTML = htmlDecode(e('f0').innerText);
            e('title2').innerHTML = htmlDecode(e('f1').innerText);
            e('title2').style.transform = "translateY('-100%')";
            e('title2').style.clipPath = clipHCen;
            setTimeout(runAnimationIN, 100);
        } // runTemplateUpdate

        function runAnimationIN() {

            var timelineIn = anime.timeline({
                easing:   'easeOutCubic',
                duration: 800
            })

            .add({
                targets:    ['#gfx, #titleBox1','#title1'],
                opacity:    [0,1],
                duration:   50,
                easing:     'linear'
            }, 0)

            .add({
                targets:    ['#title1'],
                clipPath:   { value: [clipHCen,clipNone]},
            },50)

            .add({
                targets:    ['#title1'],
                translateY: ['-100%','0%'],
            },80)
            
            .add({
                targets:    ['#fxLine'],
                translateY: ['-1000%','0%'],
                width:      ['0%','70%'],
                opacity:    [0,1],
            },400)
            
            ;


        } // runAnimationIN

        function runAnimationNEXT() {

            var timelineNext = anime.timeline({
                easing:   'easeInOutCubic',
                duration: 800
            })

            .add({
                targets:    ['#titleBox1'],
                translateY: '-50%'
            },0)

            .add({
                targets:    ['#titleBox2'],
                translateY: '50%',
                opacity:    1
            },0)

            .add({
                targets:    ['#title2'],
                opacity:    {value: 1, duration: 50, easing: 'linear'},
                clipPath:   { value: [clipHCen, clipNone], delay: 200},
            },50)

        } // runAnimationNEXT

        function runAnimationOUT() {

            var timelineOut = anime.timeline({
                easing:   'easeInCubic',
                duration: 600
            })

            .add({
                targets:    '#titleBox1',
                translateX: {value: '10%', delay: 100},
                clipPath:   clipWest
            },0)

            .add({
                targets:    '#titleBox2',
                translateX: {value: '-10%', delay: 100},
                clipPath:   clipEast,
            },0)
            ;


        } // runAnimationOUT

        window.SPXGCTemplateDefinition = {
            "description": "Title or a headline",
            "playserver": "OVERLAY",
            "playchannel": "1",
            "playlayer": "10",
            "webplayout": "10",
            "out": "manual",
            "dataformat": "json",
            "steps": 2,
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
                    "value" : "This template has two steps. Click 'Play' and then 'Continue'..."
                },
                {
                    "field" : "f0",
                    "ftype" : "textfield",
                    "title" : "Main title",
                    "value" : "Now click continue"
                },
                {
                    "field" : "f1",
                    "ftype" : "textfield",
                    "title" : "Subtitle",
                    "value" : "Step two completed!"
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
