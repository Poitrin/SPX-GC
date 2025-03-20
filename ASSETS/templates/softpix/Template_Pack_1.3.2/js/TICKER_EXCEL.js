
            let stopped = false;
            let newsItems = [];
            let clipNone = "inset(0%   0% 0% 0%)";
            let clipEast = "inset(0% 100% 0% 0%)";
            let clipWest = "inset(0% 0% 0% 100%)";
            let clipSout = "inset(0% 0% 100% 0%)";

            async function runTemplateUpdate() {
                let file = e('f1').innerText;
                e('DynamicTheme').href = e('f99').innerText;
                e('headline').innerText = e('f0').innerText;
                newsItems = await getExcelData(file);
                runAnimationIN(); // once loaded
            };

            function runAnimationIN() {
                stopped = false;
                var timelineIn = anime.timeline({
                    easing:   'easeOutCubic',
                    duration: 500
                })

                .add({
                    targets:    ['#tickerZone'],
                    opacity:    [0,1],
                    duration:   100,
                    easing:     'linear'
                },50)

                .add({
                    targets:    ['#tickerZone'],
                    clipPath:   [clipWest,clipNone],
                },200)

                .add({
                    targets:    ['#headline'],
                    translateX: ['-30%','0%'],
                    clipPath:   [clipEast,clipNone],
                },600)

                setTimeout(function () {
                    showBulletItem(-1);
                }, 1200);

            }

            function runAnimationOUT() {
                stopped = true;
                anime({
                    duration:   500,
                    targets:    '#tickerZone',
                    easing:     'easeInCubic',
                    opacity:    { value: 0, duration: 100, delay: 400},
                    clipPath:   [clipEast],
                });
            }

            function showBulletItem(nro) {
                let repeatDelay =  parseInt(e('f3').innerText.trim())*1000;
                nro = nro + 1;
                if ( nro < 0 || nro > newsItems.length-1 ) {
                    nro = 0 // 1st array item
                }

                if (!newsItems[nro] || newsItems[nro]=='') {
                    // exit early if no content on this line, try next one
                    showBulletItem(nro)
                    return
                }

                e('tickerText').innerHTML = newsItems[nro];
                e('tickerText').style.opacity = 1;

                anime({
                    targets:    '#tickerText',
                    easing:     'easeOutQuart',
                    duration:   500,
                    translateY: ['-100%', '0%'],
                    translateX: [0,0],
                });

                let tickerLineWidth = e('tickerText').offsetWidth;
                let tickerLineMaxWi = e('textMask').offsetWidth;

                
                if (tickerLineWidth > tickerLineMaxWi) {
                    let moveAmount = (tickerLineMaxWi - tickerLineWidth) - 50;
                    let scrollDuration = Math.abs(moveAmount * 8); // last number is time multiplier
                    let startHorScroll = 1500; 
                    setTimeout(function () {
                        anime({
                            targets:        '#tickerText',
                            translateX:     [0,moveAmount],
                            translateY:     [0,0],
                            delay:          500,
                            duration:       scrollDuration,
                            easing:         'easeInOutSine'
                        });
                    }, startHorScroll);
                    repeatDelay = repeatDelay + scrollDuration + 100; // additional time
                } else {
                    repeatDelay = repeatDelay;
                }

                if ( newsItems.length > 1 && !stopped) {
                    anime({
                        targets:                '#tickerText',
                        opacity:                0,
                        delay:                  repeatDelay-200,
                        duration:               100,
                        easing:                 'linear'
                    });
                    timerID = setTimeout(function () {
                        showBulletItem(nro)
                    }, repeatDelay);
                }


            } // end showBulletItem

            function getExcelData(filename) {
                    return new Promise(resolve => {
                    let workSheetsData, excelData = [];
                    let APIcall = "/api/readExcelData";
                    axios.post(APIcall,  {filename: filename})
                    .then(function (response) {
                        response.data[0].data.forEach(function (row, index) {
                            if (row[0] && index > 0) { excelData.push(row[1]); }
                        });
                        resolve(excelData);
                    })
                        .catch(function (error) {
                        console.log(error);
                    });
                    
                }
            )

            } // getExcelData

            window.SPXGCTemplateDefinition = {
                "description": "News Ticker from Excel data",
                "playserver": "OVERLAY",
                "playchannel": "1",
                "playlayer": "3",
                "webplayout": "3",
                "steps": "1",
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
                        "value" : "This template uses SPX's Excel reader. See ASSETS/excel folder for example files. Also remember SPX can utilize Google Sheets, RSS files, databases etc."
                    },
                    {
                        "field" : "f0",
                        "ftype" : "textfield",
                        "title" : "Headline",
                        "value" : "Local news"
                    },
                    {
                        "field": "f1",
                        "ftype": "filelist",
                        "title": "Choose Excel file",
                        "assetfolder" : "/excel/ticker-demo/" ,
                        "extension" : "xlsx",
                        "value": "/excel/ticker-demo/basic-news-ticker.xlsx",
                    },
                    {
                        "field" : "f2",
                        "ftype" : "number",
                        "title" : "How many items to show (default '10', all '-1')",
                        "value" : "10"
                    },
                    {
                        "field" : "f3",
                        "ftype" : "number",
                        "title" : "Flipping interval in seconds (default '4')",
                        "value" : "4"
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
