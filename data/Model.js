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
                    {label: "Magenta+", value: 6, Channel: 6, background:require("../assets/simBg/magenta.jpg")}
                ]
            },

            {
                id: 2, Model: "B", Name: 'Lite', Channels: [
                    {label: "Royal", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "Cool White", value: 5, Channel: 5},
                    {label: "Magenta+", value: 6, Channel: 6}
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

]
