window.SPXGCTemplateDefinition = {
  description: "Bumper or stinger example",
  playserver: "OVERLAY",
  playchannel: "1",
  playlayer: "18",
  webplayout: "18",
  out: "none",
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
        "This design was created entirely in After Effects, exported as a lottie-file and converted to SPX template using StreamShapers Ferryman. Also, as this graphic is 'fire-and-forget' type of element, its 'out' property is 'none'.",
    },
    {
      field: "_COLORVALUE",
      ftype: "dropdown",
      title: "Color palette",
      value: "3",
      items: [
        {
          text: "Red",
          value: "1",
        },
        {
          text: "Blue",
          value: "2",
        },
        {
          text: "Green",
          value: "3",
        },
        {
          text: "Orange",
          value: "4",
        },
        {
          text: "Grey",
          value: "5",
        },
      ],
    },
    {
      field: "_BUMPERTEXT",
      ftype: "textfield",
      title: "_BUMPERTEXT",
      value: "Swoosh!",
    },
    {
      field: "Image",
      ftype: "filelist",
      title: "Flare image",
      assetfolder: "./img/flares/",
      extension: "png",
      value: "./img/flares/whitey.png",
    },
  ],
};
