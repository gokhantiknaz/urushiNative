export const AllModels = [
    {
        Model: "A",
        Name: "Standar IKIGAI",
    },
    {
        Model: "B",
        Name: "LITE IKIGAI",
    },
    {
        Model: "C",
        Name: "ADVANCED IKIGAI",
    },
    {
        Model: "E",
        Name: "VOO BLUE",
    },
    {
        Model: "F",
        Name: "VOO PRO",
    },
    {
        Model: "G",
        Name: "VOO SUN",
    },
    {
        Model: "I",
        Name: "CHROMO SW",
    },
    {
        Model: "J",
        Name: "CHROMO FW",
    },
    {
        Model: "K",
        Name: "CHROMO BLUE DROP",
    },
    {
        Model: "L",
        Name: "CHROMO RED DROP",
    },
    {
        Model: "N",
        Name: "IZOMO SW PRO",
    },
    {
        Model: "O",
        Name: "IZOMO SW ELITE",
    },
    {
        Model: "P",
        Name: "IZOMO FW PRO",
    },
    {
        Model: "R",
        Name: "IZOMO FW LITE",
    }

]

export const Models = [
    {
        id: 1, name: "IKIGAI", SubModels: [
            {
                id: 1, Name: 'Standart', Channels: [
                    {label: "Royal", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Cyan+", value: 3, Channel: 3},
                    {label: "Actinic+", value: 4, Channel: 4},
                    {label: "He White", value: 5, Channel: 5},
                    {label: "Magenta +", value: 6, Channel: 6}
                ]
            },
            {
                id: 2, Name: 'Lite', Channels: [
                    {label: "Royal", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "Cool White", value: 5, Channel: 5},
                    {label: "Magenta +", value: 6, Channel: 6}
                ]
            },
            {
                id: 3, Name: 'Advanced', Channels: [
                    // {Channel1: "Royal Scale", Channel2: "Blue Scale", Channel3: "Turquoise Scale", Channel4: "Purple Scale", Channel5: "Pro White", Channel6: "Red Scale"}
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
        id: 2, name: "VOO", SubModels: [
            {
                id: 1, Name: 'Blu', Channels: [
                    {label: "Blue", value: 1, Channel: 1},
                    {label: "Royal", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "Magenta", value: 5, Channel: 5},
                    {label: "Cool White", value: 6, Channel: 6}
                ]
            },
            {
                id: 2, Name: 'Pro', Channels: [
                    {label: "Bluish White", value: 1, Channel: 1},
                    {label: "Royal", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4},
                    {label: "Grow", value: 5, Channel: 5},
                    {label: "Cool White", value: 6, Channel: 6}
                ]
            },
            {
                id: 3, Name: 'Sun', Channels: [
                    //{Channel1: "Magenta", Channel2: "Cool White", Channel3: "Warm White", Channel4: "UV", Channel5: "Green", Channel6: "Royal"}
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
        id: 3, name: "CHROMO", SubModels: [
            {
                id: 1, Name: 'SW', Channels: [

                    {label: "Royal", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "White", value: 4, Channel: 4}

                ]
            },
            {
                id: 2, Name: 'FW', Channels: [
                    {label: "Red", value: 1, Channel: 1},
                    {label: "Green", value: 2, Channel: 2},
                    {label: "Blue", value: 3, Channel: 3},
                    {label: "White", value: 4, Channel: 4}
                ]
            },
            {
                id: 3, Name: 'Blue Drop', Channels: [
                    {label: "Royal", value: 1, Channel: 1},
                    {label: "Blue", value: 2, Channel: 2},
                    {label: "Sky", value: 3, Channel: 3},
                    {label: "Deep", value: 4, Channel: 4}
                ]
            },
            {
                id: 4, Name: 'Red Drop', Channels: [
                    {label: "Full Red", value: 1, Channel: 1},
                    {label: "PC Amber", value: 2, Channel: 2},
                    {label: "PC Blue", value: 3, Channel: 3},
                    {label: "Lime", value: 4, Channel: 4}

                ]
            },
        ]
    },
    {
        id: 4, name: "IZUMO", SubModels: [
            {
                id: 1, Name: 'SW Pro', Channels: [
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
                id: 2, Name: 'SW Lite', Channels: [
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
                id: 3, Name: 'FW Pro', Channels: [
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
                id: 4, Name: 'FW Lite', Channels: [
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


// export const Models = [
//     {
//         id: 1, name: "IKIGAI", SubModels: [
//             {
//                 id: 1, Name: 'Pro', Channels: [
//                     {label: "Royal", value: 1, Channel: 1},
//                     {label: "Blue", value: 2, Channel: 2},
//                     {label: "Cyan+", value: 3, Channel: 3},
//                     {label: "Actinic+", value: 4, Channel: 4},
//                     {label: "He White", value: 5, Channel: 5},
//                     {label: "Magenta +", value: 6, Channel: 6}
//                 ]
//             }
//         ]
//     },
//     {
//         id: 1, name: "VOO", SubModels: [
//             {
//                 id: 1, Name: 'Pro', Channels: [
//                     {label: "Royal", value: 1, Channel: 1},
//                     {label: "Blue", value: 1, Channel: 2},
//                     {label: "Cyan+", value: 1, Channel: 3},
//                     {label: "Actinic+", value: 1, Channel: 4},
//                     {label: "He White", value: 1, Channel: 5},
//                     {label: "Magenta +", value: 1, Channel: 6}
//                 ]
//             },
//             {
//                 id: 2, Name: 'Blue', Channels: [
//                     {label: "Royal", value: 1, Channel: 1},
//                     {label: "Blue", value: 1, Channel: 2},
//                     {label: "Cyan+", value: 1, Channel: 3},
//                     {label: "Actinic+", value: 1, Channel: 4},
//                     {label: "He White", value: 1, Channel: 5},
//                     {label: "Magenta +", value: 1, Channel: 6}
//                 ]
//             }
//         ]
//     },
// ]
