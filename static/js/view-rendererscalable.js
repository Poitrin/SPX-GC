/**
 * Moved from views/view-rendererscalable.handlebars
 * + assuming that mode is "preview"
 * + reading width and height from body dataset
 */
var socket = io();
let socData = {};

socket.on("connect", function () {
  socData.name = "SPX_PREVIEW";
  socData.spxcmd = "identifyClient";
  socket.emit("SPXMessage2Server", socData);
});

socket.on("SPXMessage2Client", function (data) {
  if (data.spxcmd == "closepreview" && socData.name == "SPX_PREVIEW") {
    window.close();
  }
  if (data.spxcmd == "closeprogram" && socData.name == "SPX_PROGRAM") {
    window.close();
  }
}); // end SPXMessage2Client

function resizePreview() {
  // renderscalable
  // Scalable renderer size set by SPX to {{width}}x{{height}}
  let DefaultX = document.body.dataset.width; // Math always defaults to 16:9
  let DefaultY = document.body.dataset.height;
  // console.log('Resizer ' + DefaultX + ' x ' + DefaultY + ' px');

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  if (DefaultX.includes("vw")) {
    // Responsive settings, use window size! Added in v1.3.0
    // console.log('Responsive settings, use window size! Added in v1.3.0');
    DefaultX = vw;
    DefaultY = vh;
  }

  let Wpx = vw; // document.getElementById('previewWidthRuler').offsetWidth;
  let Sca = Wpx / parseInt(DefaultX);
  let Hpx = parseInt(parseInt(DefaultY) * Sca);
  document.getElementById("previewBG").style.width = Wpx + "px";
  document.getElementById("previewBG").style.height = Hpx + "px";
  document.getElementById("previewIF").style.transform = "scale(" + Sca + ")";
  document.getElementById("previewBG").style.display = "block";
  // console.log('Resized to ' + Wpx + ' x ' + Hpx + ' px, scale multiplier: ' + Sca);
}

window.addEventListener("load", resizePreview);
window.addEventListener("resize", resizePreview);
