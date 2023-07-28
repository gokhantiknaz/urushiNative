export const AllModels = [
    {
        Id: 1,
        Model: "A",
        Name: "Standar IKIGAI",
    },
    {
        Id: 2,
        Model: "B",
        Name: "LITE IKIGAI",
    },
    {
        Id: 3,
        Model: "C",
        Name: "ADVANCED IKIGAI",
    },
    {
        Id: 4,
        Model: "E",
        Name: "VOO BLUE",
    },
    {
        Id: 5,
        Model: "F",
        Name: "VOO PRO",
    },
    {
        Id: 6,
        Model: "G",
        Name: "VOO SUN",
    },
    {
        Id: 7,
        Model: "I",
        Name: "CHROMO SW",
    },
    {
        Id: 8,
        Model: "J",
        Name: "CHROMO FW",
    },
    {
        Id: 9,
        Model: "K",
        Name: "CHROMO BLUE DROP",
    },
    {
        Id: 10,
        Model: "L",
        Name: "CHROMO RED DROP",
    },
    {
        Id: 11,
        Model: "N",
        Name: "IZOMO SW PRO",
    },
    {
        Id: 12,
        Model: "O",
        Name: "IZOMO SW ELITE",
    },
    {
        Id: 13,
        Model: "P",
        Name: "IZOMO FW PRO",
    },
    {
        Id: 14,
        Model: "R",
        Name: "IZOMO FW LITE",
    }
]

export const Models = [
    {
        id: 1, name: "IKIGAI", serviceUUId: "4fafc201-1fb5-459e-8fcc-c5c9c331914b", SubModels: [
            {
                id: 1, Model: "A", Name: 'Standart', Channels: [
                    {label: "Royal", value: 1, Channel: 1, background:require("../assets/simBg/blue.jpg")},
                    {label: "Blue", value: 2, Channel: 2,background:require("../assets/simBg/royalBlue.jpg")},
                    {label: "Cyan+", value: 3, Channel: 3,background:require("../assets/simBg/cyan.jpg")},
                    {label: "Actinic+", value: 4, Channel: 4,background:require("../assets/simBg/actinic.jpg")},
                    {label: "He White", value: 5, Channel: 5,background:require("../assets/simBg/white.jpg")},
                    {label: "Magenta +", value: 6, Channel: 6, background:require("../assets/simBg/magenta.jpg")}
                ]
            },

            {
                id: 2, Model: "B", Name: 'Lite', Channels: [
                    {label: "Royal", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "Cool White", value: 5, Channel: 5},
                    {label: "Magenta +", value: 6, Channel: 6}
                ]
            },
            {
                id: 3, Model: "C", Name: 'Advanced', Channels: [
                    {label: "Royal Scale", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Turquoise Scale", value: 3, Channel: 3},
                    {label: "Purple Scale", value: 4, Channel: 4},
                    {label: "Pro White", value: 5, Channel: 5},
                    {label: "Red Scale", value: 6, Channel: 6}
                ]
            }
        ]
    },
    {
        id: 2, name: "VOO",serviceUUId: "00002d8d-0000-1000-8000-00805f9b34fb",  SubModels: [
            {
                id: 1, Model: "E", Name: 'Blu', Channels: [
                    {label: "Blue", value: 1, Channel: 1},
                    {label: "Royal", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "Magenta", value: 5, Channel: 5},
                    {label: "Cool White", value: 6, Channel: 6}
                ]
            },
            {
                id: 2, Model: "F", Name: 'Pro', Channels: [
                    {label: "Bluish White", value: 1, Channel: 1},
                    {label: "Royal", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "Grow", value: 5, Channel: 5},
                    {label: "Cool White", value: 6, Channel: 6}
                ]
            },
            {
                id: 3, Model: "G", Name: 'Sun', Channels: [
                    {label: "Magenta", value: 1, Channel: 1},
                    {label: "Cool White", value: 2, Channel: 2},
                    {label: "Warm White", value: 3, Channel: 3},
                    {label: "UV", value: 4, Channel: 4},
                    {label: "Green", value: 5, Channel: 5},
                    {label: "Royal", value: 6, Channel: 6}
                ]
            }
        ]
    },
    {
        id: 3, name: "CHROMO",serviceUUId: "b067f00d-744d-8db5-9b42-aae2d7041e3c",  SubModels: [
            {
                id: 1, Model: "I", Name: 'SW', Channels: [

                    {label: "Royal", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "White", value: 4, Channel: 4}

                ]
            },
            {
                id: 2, Model: "J", Name: 'FW', Channels: [
                    {label: "Red", value: 1, Channel: 1},
                    {label: "Green", value: 2, Channel: 2},
                    {label: "Blue", value: 3, Channel: 3},
                    {label: "White", value: 4, Channel: 4}
                ]
            },
            {
                id: 3, Model: "K", Name: 'Blue Drop', Channels: [
                    {label: "Royal", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4}
                ]
            },
            {
                id: 4, Model: "L", Name: 'Red Drop', Channels: [
                    {label: "Full Red", value: 1, Channel: 1},
                    {label: "PC Amber", value: 2, Channel: 2},
                    {label: "PC Blue", value: 3, Channel: 3},
                    {label: "Lime", value: 4, Channel: 4}

                ]
            },
        ]
    },
    {
        id: 4, name: "IZUMO",serviceUUId: "8e6f0f58-5819-11e6-8b77-86f30ca893d3",  SubModels: [
            {
                id: 1, Model: "N", Name: 'SW Pro', Channels: [
                    {label: "Blue", value: 1, Channel: 1},
                    {label: "Royal", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "Magenta", value: 5, Channel: 5},
                    {label: "Cool White", value: 6, Channel: 6},
                    {label: "Warm White", value: 7, Channel: 7},
                    {label: "Actinic", value: 8, Channel: 8}
                ]
            },
            {
                id: 2, Model: "O", Name: 'SW Lite', Channels: [
                    {label: "Bluish White", value: 1, Channel: 1},
                    {label: "Royal", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "N/A", value: 5, Channel: 5},
                    {label: "N/A", value: 6, Channel: 6},
                    {label: "N/A", value: 7, Channel: 7},
                    {label: "N/A", value: 8, Channel: 8}
                ]
            },
            {
                id: 3, Model: "P", Name: 'FW Pro', Channels: [
                    {label: "Red", value: 1, Channel: 1},
                    {label: "Green", value: 2, Channel: 2},
                    {label: "Blue", value: 3, Channel: 3},
                    {label: "Ultra Cool White", value: 4, Channel: 4},
                    {label: "Cool White", value: 5, Channel: 5},
                    {label: "Warm White", value: 6, Channel: 6},
                    {label: "UV", value: 7, Channel: 7},
                    {label: "Magenta", value: 8, Channel: 8}
                ]
            },
            {
                id: 4, Model: "R", Name: 'FW Lite', Channels: [
                    {label: "Red", value: 1, Channel: 1},
                    {label: "Green", value: 2, Channel: 2},
                    {label: "Blue", value: 3, Channel: 3},
                    {label: "White", value: 4, Channel: 4},
                    {label: "N/A", value: 5, Channel: 5},
                    {label: "N/A", value: 6, Channel: 6},
                    {label: "N/A", value: 7, Channel: 7},
                    {label: "N/A", value: 8, Channel: 8}
                ]
            }
        ]
    }
]
