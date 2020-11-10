// Проверка репозитория ++
// Раздел с классами
class HumanBorn {
    constructor() {
        this.name = name;
        this.age = age;
        this.healthPoint = healthPoint;
        this.money = money;
    }
    takeWeapon(weaponName) {
        this.weapon = weaponName;
    }
    useWeapon(targetName) {
        let shotResult = ((Math.floor(Math.random() * 100)) / 100);
        if (shotResult <= this.weapon.accuracy) {
            targetName.healthPoint = targetName.healthPoint - this.weapon.damage;
            console.log('Есть попадание!');
        } else {
            console.log('Промах!')
        }
    }
}

class CopCreate extends HumanBorn {
    constructor() {
        super();
        this.status = 'cop';
    }
    eatDonut() {
        if (this.status !== 'cop') return console.log('This human is not a cop!');
        console.log(`Cop ${this.name} eated donut!`);
    }
    joiningToGroup(groupName) {
        if (this.status !== 'cop') return console.log('This human is not a cop!');
        if (groupName.includes(this) === false) {
            groupName.push(this);
        } else {
            console.log('This cop is already in the group!')
        }
    }
}

class BanditCreate extends HumanBorn {
    constructor() {
        super();
        this.status = 'bandit';
    }
    lootCivilian(civilName, amountMoney) {
        if (civilName.money > amountMoney) {
            civilName.money = civilName.money - amountMoney;
            this.money = this.money + amountMoney;
            console.log(`${civilName} looted!`)
        } else {
            this.money = this.money + civilName.money;
            civilName.money = 0;
            console.log(`${civilName} gave the last money!`)
        }
    }
    joiningToBand(bandName) {
        if (bandName.includes(this) === false) {
            bandName.push(this);
        } else {
            console.log('This bandit is already in the group!')
        }
    }
}

class CivilCreate extends HumanBorn {
    constructor() {
        super();
        this.status = 'civil';
    }
    dismissCop(copName) {
        if (copName.status === 'cop') {
            if (copsGroup.includes(copName)) copsGroup.splice(copsGroup.indexOf(copName), 1); // удаление копа из группы после его увольнения         
            copName.status = 'not a cop';
        } else {
            console.log('This human not a cop!')
        }
    }
}

class Weapon {
    constructor() {
        this.damage = damage;
        this.accuracy = accuracy;
    }
}

//массивы для кооперации
const copsGroup = [];
const banditsBand = [];

// создание стволов
const pistol = new Weapon(
    damage = 45,
    accuracy = 0.6,
)

const shootgun = new Weapon(
    damage = 80,
    accuracy = 0.4,
)

// создание человеков
const copAlex = new CopCreate(
    name = 'Alex',
    age = 28,
    healthPoint = 100,
    money = 450,
);

const copJohn = new CopCreate(
    name = 'John',
    age = 30,
    healthPoint = 100,
    money = 400,
);

const civilPary = new CivilCreate(
    name = 'Pary',
    age = 24,
    healthPoint = 100,
    money = 40,
);

const civilMary = new CivilCreate(
    name = 'Mary',
    age = 25,
    healthPoint = 100,
    money = 80,
);

const banditJorno = new BanditCreate(
    name = 'Jorno',
    age = 18,
    healthPoint = 100,
    money = 250,
);

const banditJotaro = new BanditCreate(
    name = 'Jotaro',
    age = 20,
    healthPoint = 100,
    money = 250,
);

copAlex.takeWeapon(pistol);
copAlex.joiningToGroup(copsGroup);
copJohn.joiningToGroup(copsGroup);

banditJorno.takeWeapon(shootgun);
banditJorno.joiningToBand(banditsBand);
banditJotaro.joiningToBand(banditsBand);