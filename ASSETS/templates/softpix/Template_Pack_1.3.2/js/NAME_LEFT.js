
        let clipNone = "inset(0%   0% 0% 0%)";
        let clipEast = "inset(0% 100% 0% 0%)";
        let clipSout = "inset(0% 0% 100% 0%)";
        
        function runTemplateUpdate() {
            e('DynamicTheme').href = e('f99').innerText;
            e('text1').innerHTML = htmlDecode(e('f0').innerText);
            e('text2').innerHTML = htmlDecode(e('f1').innerText);
            e('text3').innerHTML = htmlDecode(e('f2').innerText);

            // Show all
            e('box1').style.display='flex';
            e('box3').style.display='flex';
            e('box4').style.display='flex';

            // Hide empty ones
            if (e('f0').innerText=='') { e('box1').style.display='none'; }
            if (e('f1').innerText=='') { e('box3').style.display='none'; }
            if (e('f2').innerText=='') { e('box4').style.display='none'; }

            setTimeout(runAnimationIN, 50);
        } // runTemplateUpdate

        function runAnimationIN() {

            var timelineIn = anime.timeline({
                easing:   'easeOutCubic',
                duration: 500
            })

            .add({
                targets:    ['#gfx'],
                opacity:    [0,1],
                duration:   50,
                easing:     'linear'
            },0)

            .add({
                targets:    ['#box1'],
                duration:   300, 
                clipPath:   [clipEast,clipNone],
                opacity:    [0,1],
            },50)
            
            .add({
                targets:    ['#text1'],
                opacity:    { value: [0,1], duration: 300},
                translateX: { value: ['50%','0%'], duration: 800 },
            },0)

            .add({
                targets:    ['#box3', '#box4', '#text2', '#text3'],
                opacity:    { value: [0,1], duration: 50, easing: 'linear'},
                translateY: { value: ['-100%','0%'], duration: 500 },
                delay:      anime.stagger(100)
            },50);

        } // runAnimationIN

        function runAnimationOUT() {

            var timelineOut = anime.timeline({
                easing:   'easeInCubic',
                duration: 600
            })

            .add({
                targets:    ['#text1'],
                translateX: { value: ['50%'] },
            },0)

            .add({
                targets:    ['#text3', '#text2'],
                opacity:    { value: 0, duration: 200, easing: 'linear'},
                delay:      anime.stagger(100)
            },100)

            .add({
                targets:    ['#gfx'],
                clipPath:   clipEast,
                opacity:    { value: 0, duration: 200, delay: 500},
            },100)
            
            .add({
                targets:    '#logoLeft',
                clipPath:   clipEast,
                duration:   200,
            },500)
            ;

        } // runAnimationOUT

        window.SPXGCTemplateDefinition = {
            "description": "Namestrap left",
            "playserver": "OVERLAY",
            "playchannel": "1",
            "playlayer": "5",
            "webplayout": "5",
            "out": "manual",
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
                    "value" : "You can leave any field empty for a different style. This is an example from the default template pack. For more templates see ▶ spx.graphics/store"
                },
                {
                    "field" : "f0",
                    "ftype" : "textfield",
                    "title" : "Fullname",
                    "value" : "Palmer Joss"
                },
                {
                    "field" : "f1",
                    "ftype" : "textfield",
                    "title" : "Title",
                    "value" : "Advisor"
                },
                {
                    "field" : "f2",
                    "ftype" : "textfield",
                    "title" : "Company or location",
                    "value" : "White House"
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
