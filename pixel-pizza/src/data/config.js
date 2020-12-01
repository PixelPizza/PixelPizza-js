'use strict';

module.exports = {
    prefix: "pp",
    currency: "€",
    verification: "774640628374044723",
    workerRoles: "775150876418506792",
    botGuild: "709698572035162143",
    noiceboardMinValue: 3,
    maxPizzas: 20,
    proAmount: 250,
    idLength: 5,
    orderCooldown: 300,
    minPrice: 5,
    maxPrice: 75,
    minWorkEarning: 10,
    maxWorkEarning: 75,
    workCauses: [
        "You work for {botguild} and earn {earning}. Good job!!",
        "You worked hard as a farmer and earned {earning}",
        "You gave good scuba diving lessons, you earned {earning}",
        "Damm u spent some time working... here's {earning} for your hard work",
        "You are lazy, but you still get paid. Here's {earning}...",
        "Alright I am out of ideas here's {earning} and don't tell anyone",
        "You deserved this money for saying 1 word. you got {earning}!",
        "Alright here's {earning} that you totally didn't steal"
    ],
    statuses: {
        orders: [
            "not claimed",
            "claimed",
            "cooking",
            "cooked",
            "delivered",
            "deleted"
        ],
        applications: [
            "none",
            "accepted",
            "rejected"
        ]
    },
    restricedDomains: [
        "facebook.com",
        "instagram.com",
        "twitter.com"
    ],
    pponlyexceptions: [
        "762346707920879636"
    ],
    invite: "AW7z9qu",
    creators: [
        "472312270047674378",
        "596012554598481977"
    ]
};