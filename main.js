// Раздел с классами
class Human {
  constructor(name, age, healthPoints, money) {
    this.name = name;
    this.age = age;
    this.healthPoints = healthPoints;
    this.money = money;
    this.weapon = null;
  }
  takeWeapon(weapon) {
    this.weapon = weapon;
  }
}

class Cop extends Human {
  constructor(name, age, healthPoints, money) {
    super(name, age, healthPoints, money);
    // this.group = null;
  }
  eatDonut() {
    console.log(`Cop ${this.name} eated donut!`);
  }
  // не удалсь реализовать метод для создания группы человеком
  // createGroup(group) {
  //   group = new Group()
  //   return group
  // }
  // createGroup() {
  //   let new Group();
  // }
  joinGroup(group) {
    if (!(group instanceof Group))
      return console.log(`This is not a cop formation!`);
    if (this in group) {
      return console.log("This cop is already in the group!");
    }
    return (group[this.name] = this);
  }
  // // создать экземпляр класса Group методом копа или бандита не удалось, поэтому, как по мне, получился костыль
  // joinGroup(group) {
  //   if (!(group instanceof Group))
  //     return console.log(`This is not a cop formation!`);
  //   if (group.members.includes(this)) {
  //     return console.log("This cop is already in the group!");
  //   }
  //   return group.members.push(this);
  // }
}

class Bandit extends Human {
  constructor(name, age, healthPoints, money) {
    super(name, age, healthPoints, money);
  }
  lootCivil(civil, amount = 50) {
    if (civil.money > amount) {
      civil.money = civil.money - amount;
      this.money = this.money + amount;
      return console.log(`${civil.name} looted!`);
    }
    this.money = this.money + civil.money;
    civil.money = 0;
    return console.log(`${civil.name} gave the last money!`);
  }
  joinGroup(group) {
    if (!(group instanceof Group)) return console.log(`This is not a cop formation!`)
    if (this in group) {
      return console.log("This cop is already in the group!");
    }
    return (group[this.name] = this)
  }
  // joinBand(band) {
  //   if (!(band instanceof Band))
  //     return console.log(`This is not a bandit formation!`);
  //   if (band.members.includes(this)) {
  //     return console.log("This bandit is already in the group!");
  //   }
  //   return band.members.push(this);
  // }
}

class Civil extends Human {
  constructor(name, age, healthPoints, money) {
    super(name, age, healthPoints, money);
  }
  // Создание нового класса civil для копа, при его увольнении, не ведет к удалению обьекта этого копа!
  dismissCop(cop) {
    if (!(cop instanceof Cop)) return console.log(`This is not a cop!`);
    return new Civil(cop.name, cop.age, cop.money, cop.healthPoints);
  }
}

class Group {}

class Band {}

class Weapon {
  constructor(damage, accuracy) {
    this.damage = damage;
    this.accuracy = accuracy;
  }
  use(target) {
    let shotResult = Math.floor(Math.random() * 100) / 100;
    if (shotResult <= this.accuracy) {
      target.healthPoints = target.healthPoints - this.damage;
      return console.log("Hit!");
    }
    return console.log("Miss!");
  }
}

// создание групп
let group = new Group();
let band = new Band();

// создание стволов
let pistol = new Weapon(45, 0.6);
let shootgun = new Weapon(80, 0.4);

// создание человеков
let copAlex = new Cop("Alex", 28, 100, 450);
let copJohn = new Cop("John", 30, 100, 400);
let civilPary = new Civil("Pary", 24, 100, 150);
let civilMary = new Civil("Mary", 25, 100, 150);
let banditJorno = new Bandit("Jorno", 18, 100, 250);
let banditJotaro = new Bandit("Jotaro", 20, 100, 250);

copAlex.takeWeapon(pistol);
copAlex.weapon.use(copJohn);

banditJorno.takeWeapon(shootgun);
