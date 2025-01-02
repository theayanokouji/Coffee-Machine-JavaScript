// library for getting input
const input = require('sync-input');

// function constructor to create a Coffee Machine
function CoffeeMachine(water, milk, coffeeBeans, money, numberOfCups) {
    this.water = water;
    this.milk = milk;
    this.coffeeBeans = coffeeBeans;
    this.money = money;
    this.numberOfCups = numberOfCups;

    // output what the coffee machine currently has
    this.display = () => {
        console.log(`
        The coffee machine has:
        ${this.water} ml of water
        ${this.milk} ml of milk
        ${this.coffeeBeans} g of coffee beans
        ${this.numberOfCups} disposable cups
        $${this.money} of money
        `);
    };

    this.hasEnoughResources = (value, minimum)  => {
        return value >= minimum;
    };

    // function to buy coffee
    this.buyCoffee = (coffeeType) => {
        switch (coffeeType) {
            case 1:
                // make espresso
                if (!this.hasEnoughResources(this.water, 250)) {
                    return -1;
                }

                if (!this.hasEnoughResources(this.coffeeBeans, 16)) {
                    return -3;
                }

                this.water -= 250;
                this.coffeeBeans -= 16;
                this.money += 4; // costs $4
                this.numberOfCups--;
                break;
            case 2:
                // make latte
                if (!this.hasEnoughResources(this.water, 350)) {
                    return -1;
                }

                if (!this.hasEnoughResources(this.milk, 75)) {
                    return -2;
                }

                if (!this.hasEnoughResources(this.coffeeBeans, 20)) {
                    return -3;
                }

                this.water -= 350;
                this.milk -= 75;
                this.coffeeBeans -= 20;
                this.money += 7; // costs $7
                this.numberOfCups--;
                break;
            case 3:
                // make cappuccino
                if (!this.hasEnoughResources(this.water, 200)) {
                    return -1;
                }

                if (!this.hasEnoughResources(this.milk, 100)) {
                    return -2;
                }

                if (!this.hasEnoughResources(this.coffeeBeans, 12)) {
                    return -3;
                }

                this.water -= 200;
                this.milk -= 100;
                this.coffeeBeans -= 12;
                this.money += 6; // costs $6
                this.numberOfCups--;
                break;
        }
        return 0; // means everything went well
    };

    this.withdraw = () => {
      console.log(`I gave you $${this.money}`);
      this.money = 0;
    };

    this.outputResponse = (answer) => {
        switch (answer) {
            case -1:
                console.log('Sorry, not enough water!');
                break;
            case -2:
                console.log('Sorry, not enough milk!');
                break;
            case -3:
                console.log('Sorry, not enough coffee beans!');
                break;
            default:
                console.log('I have enough resources, making you a coffee!');
                break;
        }
    };
}

const getNumber = (prompt) => {
    let number;
    do {
        number = Number(input(prompt));
        if (isNaN(number)) {
            console.log('Please enter a valid number!');
        }
    } while(isNaN(number));
    return number;
};

// create coffee machine object
const coffeeMachine = new CoffeeMachine(400, 540, 120, 550, 9);

const chooseAction = () => {

    let action = '';

    do {
        action = input('\nWrite action (buy, fill, take, exit, remaining):\n');

        // handle user choice
        switch (action) {
            case 'buy':
                const answer = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:');

                if (answer === 'back') {
                    continue;
                }

                let coffeeType = Number(answer);

                const response = coffeeMachine.buyCoffee(coffeeType);
                coffeeMachine.outputResponse(response);
                break;
            case 'fill':
                const amountOfWater = getNumber('Write how many ml of water you want to add:\n');
                const amountOfMilk = getNumber('Write how many ml of milk you want to add:\n');
                const amountOfCoffeeBeans = getNumber('Write how many ml of coffee beans you want to add:\n');
                const disposableCups = getNumber('Write how many disposable cups you want to add:\n');
                // update the coffee machine
                coffeeMachine.water += amountOfWater;
                coffeeMachine.milk += amountOfMilk;
                coffeeMachine.coffeeBeans += amountOfCoffeeBeans;
                coffeeMachine.numberOfCups += disposableCups;
                break;
            case 'take':
                coffeeMachine.withdraw();
                break;
            case 'remaining':
                coffeeMachine.display();
                break;
        }
    } while (action !== 'exit');
};

// choose action
chooseAction();
