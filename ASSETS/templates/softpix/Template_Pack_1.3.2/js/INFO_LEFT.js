let clipNone = "inset(0%   0% 0% 0%)";
let clipEast = "inset(0% 100% 0% 0%)";
let clipWest = "inset(0% 0% 0% 100%)";
let clipSout = "inset(0% 0% 100% 0%)";

function runTemplateUpdate() {
  console.clear();
  e("DynamicTheme").href = e("f99").innerText;
  e("leftText").innerHTML = htmlDecode(e("f0").innerText);

  if (e("f1").innerText == "none") {
    // no icon
    e("icon").style.display = "none";
  } else {
    // show icon
    e("leftInfo").style.paddingLeft = "7vw";
    e("icon").style.display = "flex";
    const params = {
      container: e("icon"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: e("f1").innerText,
    };
    anim = lottie.loadAnimation(params);
    anim.addEventListener("data_ready", () => {
      anim.goToAndPlay("in1");
    });
  }

  runAnimationIN();
}

function runAnimationIN() {
  var timelineIn = anime
    .timeline({
      easing: "easeOutCubic",
      duration: 800,
    })

    .add(
      {
        targets: ["#gfx"],
        opacity: { value: [0, 1], easing: "linear", duration: 100 },
        translateX: { value: ["-20%", "0%"] },
      },
      0
    )

    .add(
      {
        targets: ["#leftInfo"],
        clipPath: [clipEast, clipNone],
        opacity: [0, 1],
      },
      50
    )

    .add(
      {
        targets: ["#leftText"],
        opacity: { value: [0, 1] },
        translateY: { value: ["-50%", "0%"] },
      },
      400
    );
} // runAnimationIN

function runAnimationOUT() {
  var timelineIn = anime
    .timeline({
      easing: "easeInCubic",
      duration: 400,
    })

    .add(
      {
        targets: ["#leftText"],
        translateX: "20%",
        opacity: { value: 0, duration: 100, delay: 300 },
      },
      0
    )

    .add(
      {
        targets: ["#gfx"],
        clipPath: { value: clipEast, duration: 500 },
        opacity: { value: 0, duration: 200, delay: 400 },
      },
      0
    );
} // runAnimationOUT

window.SPXGCTemplateDefinition = {
  description: "Top left with icon",
  playserver: "OVERLAY",
  playchannel: "1",
  playlayer: "7",
  webplayout: "7",
  out: "manual",
  dataformat: "json",
  uicolor: "3",
  DataFields: [
    {
      field: "comment",
      ftype: "textfield",
      title: "Nickname of this item on the rundown",
      value: "[ Item nickname ]",
    },
    {
      ftype: "instruction",
      value:
        "This template demonstrates the use of dropdowns to choose a file. Animated vector icons are in the lottie-subfolder.",
    },
    {
      field: "f0",
      ftype: "textfield",
      title: "Info text",
      value: "Headquarters",
    },
    {
      field: "f1",
      ftype: "filelist",
      title: "Icon",
      assetfolder: "./lottie/",
      extension: "json",
      value: "./lottie/live-default.json",
    },
    {
      field: "f99",
      ftype: "filelist",
      title: "Visual theme",
      assetfolder: "./themes/",
      extension: "css",
      value: "./themes/Default.css",
    },
  ],
};
