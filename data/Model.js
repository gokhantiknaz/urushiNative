export const Models = [
    {
        id: 1, name: "L SERIES", serviceUUId: "5b2487d6-52d2-4645-beff-88202e155af1", SubModels: [
            {
                id: 1, Model: "A", Name: 'SPECTRUM+', Channels: [
                    {label: "6000K", value: 1, Channel: 1, background: require("../assets/simBg/white.jpg")},
                    {label: "8000K", value: 2, Channel: 2, background: require("../assets/simBg/blue.jpg")},
                    {label: "10000K", value: 3, Channel: 3, background: require("../assets/simBg/actinic.jpg")},
                    {label: "PINK", value: 4, Channel: 4, background: require("../assets/simBg/magenta.jpg")}

                ]
            },
            {
                id: 2, Model: "B", Name: 'RGBW', Channels: [
                    {label: "RED", value: 1, Channel: 1, background: require("../assets/simBg/white.jpg")},
                    {label: "GREEN", value: 2, Channel: 2, background: require("../assets/simBg/blue.jpg")},
                    {label: "BLUE", value: 3, Channel: 3, background: require("../assets/simBg/actinic.jpg")},
                    {label: "WHITE", value: 4, Channel: 4, background: require("../assets/simBg/magenta.jpg")}
                ]
            }
        ]
    },
    {
        id: 2, name: "M SERIES", serviceUUId: "4d47083a-311c-11ee-be56-0242ac120002", SubModels: [
            {
                id: 1, Model: "C", Name: 'FW', Channels: [
                    {label: "WHITE", value: 1, Channel: 1, background: require("../assets/simBg/white.jpg")},
                    {label: "WIDE SPECTRUM", value: 2, Channel: 2, background: require("../assets/simBg/magenta.jpg")}
                ]
            },
            {
                id: 2, Model: "D", Name: 'SW', Channels: [
                    {label: "ROYAL", value: 1, Channel: 1, background: require("../assets/simBg/blue.jpg")},
                    {label: "20000K", value: 2, Channel: 2, background: require("../assets/simBg/white.jpg")}
                ]
            }
        ]
    }
]


