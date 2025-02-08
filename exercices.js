const readline = require('readline');

const SHOP_NAME = "Magic MNS";
const SORCERER_NAME = "Archibald 🧙‍♂️";
let nbPotions = 27;
const potionPrice = 50.50;
const shopIsOpen = true;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (shopIsOpen) {
    console.log("Bienvenue dans la boutique " + SHOP_NAME + " Aventurier ! 🎉");
} else {
    console.log("La boutique " + SHOP_NAME + " est fermée, revenez plus tard Aventurier ! 😴");
    rl.close();
    process.exit();
}

function askQuestion() {
    rl.question(
        "\nBienvenue dans mon humble boutique Aventurier. Que veux-tu savoir ? 🤔\n" +
        "1. Le nom de la boutique\n" +
        "2. Le nom du Sorcier\n" +
        "3. Le prix d'une potion de soin\n" +
        "4. La quantité de potions de soin en stock\n" +
        "5. Quitter la boutique\n" +
        "Choisissez un nombre : ",
        (userChoice) => {
            let userChoiceInt = parseInt(userChoice);
            userChoiceInt = isNaN(userChoiceInt) ? 0 : userChoiceInt;

            switch (userChoiceInt) {
                case 1:
                    console.log("Le nom de la boutique : " + SHOP_NAME);
                    break;
                case 2:
                    console.log("Mon nom de sorcier est : " + SORCERER_NAME);
                    break;
                case 3: {
                    const format = new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                    });
                    console.log("Le prix d'une potion de soin est de : " + format.format(potionPrice));
                }
                    break;
                case 4: {
                    const format = new Intl.NumberFormat('fr-FR', {
                        style: 'decimal',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    });
                    console.log("La quantité de potion de soin en stock : " + format.format(nbPotions));
                }
                    break;
                case 5:
                    console.log("Merci de ta visite, aventurier ! À bientôt ! 👋");
                    rl.close();
                    return;
                default:
                    console.log("Mh... Désolé aventurier, je ne comprends pas ce que tu souhaites. Refais ton choix ! 😕");
            }

            setTimeout(askQuestion,1500); // Redemander après une réponse
        }
    );
}

// askQuestion();

function totalPricePotions() {
    rl.question(
        "Combien de potions voulez-vous acheter ? ",
        (userChoice) => {
            let userChoiceInt = parseInt(userChoice);
            userChoiceInt = isNaN(userChoiceInt) ? 0 : userChoiceInt;

            const format = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
            });

            const totalPrice = userChoiceInt * potionPrice;
            console.log(`Le prix de ${userChoiceInt} potions de soins est de : ` + format.format(totalPrice) + " 🪙 mon cher Aventurier. 💸.");

            rl.close(); // On ferme seulement après que l'utilisateur ait répondu
        }
    );
}

// totalPricePotions();

function buyPotions() {
    let availableMoney = 150.20;
    rl.question(
        "Combien de potions voulez-vous acheter ? ",
        (userChoice) => {
            let userChoiceInt = parseInt(userChoice);
            userChoiceInt = isNaN(userChoiceInt) ? 0 : userChoiceInt;

            const format = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
            });

            const totalPrice = userChoiceInt * potionPrice;

            if (totalPrice <= availableMoney && userChoiceInt <= nbPotions) {
                availableMoney -= totalPrice;
                nbPotions -= userChoiceInt;
                console.log(`Le prix de ${userChoiceInt} potions de soins est de : ` + format.format(totalPrice) + " 🪙 mon cher Aventurier. 💸.");
                console.log("Vous disposez désormais de " + format.format(availableMoney) + " dans votre bourse cher aventurier.");
            }
            else if (totalPrice > availableMoney) {
                console.log(`Le prix de ${userChoiceInt} potions de soins est de : ` + format.format(totalPrice) + " 🪙 mon cher Aventurier. 💸.");
                console.log("Hors vous ne disposez que de " + format.format(availableMoney) + " dans votre bourse.");
            }
            else {
                console.log(`Désole cher aventurier, je ne dispose en stocks que ${nbPotions} potion(s) de soins.`);
            }
                
            rl.close(); // On ferme seulement après que l'utilisateur ait répondu
        }
    );
}

buyPotions();