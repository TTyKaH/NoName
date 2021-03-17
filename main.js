// Раздел с классами
class Human {
  constructor(name, age, healthPoints, money) {
    this.name = name
    this.age = age
    this.healthPoints = healthPoints
    this.money = money
    this.weapon = null
    this.pokemon = null
  }
  takeWeapon(weapon) {
    this.weapon = weapon
  }
  setPokemon(pokemon) {
    this.pokemon = pokemon
  }
}

class Cop extends Human {
  constructor(name, age, healthPoints, money) {
    super(name, age, healthPoints, money)
  }
  eatDonut() {
    console.log(`Cop ${this.name} eated donut!`)
  }
}

class Bandit extends Human {
  constructor(name, age, healthPoints, money) {
    super(name, age, healthPoints, money)
  }
  lootCivil(civil, amount = 50) {
    if (civil.money > amount) {
      civil.money = civil.money - amount
      this.money = this.money + amount
      return console.log(`${civil.name} looted!`)
    }
    this.money = this.money + civil.money
    civil.money = 0
    return console.log(`${civil.name} gave the last money!`)
  }
}
class Civil extends Human {
  constructor(name, age, healthPoints, money) {
    super(name, age, healthPoints, money)
  }
  dismissCop(cop) {
    if (!(cop instanceof Cop)) return console.log(`This is not a cop!`)
    return new Civil(cop.name, cop.age, cop.money, cop.healthPoints)
  }
}
class Weapon {
  constructor(damage, accuracy) {
    this.damage = damage
    this.accuracy = accuracy
  }
  use(target) {
    let shotResult = Math.floor(Math.random() * 100) / 100
    if (shotResult <= this.accuracy) {
      target.healthPoints = target.healthPoints - this.damage
      return console.log("Hit!")
    }
    return console.log("Miss!")
  }
}

class Population {
  constructor() {
    this.peopleList = []
  }
  add(human) {
    if (!(human instanceof Human)) return console.log(`This is not a human!`)
    for (let i = 0; i < this.peopleList.length; i++) {
      if (human === this.peopleList[i])
        return console.log(`This human is already registered!`)
    }
    return this.peopleList.push(human)
  }
  size() {
    return this.peopleList.length
  }
}

class Pokemon {
  constructor(name, height) {
    this.name = name
    this.height = height
  }
  static getByName(name) {
    let pokemonAPI = new PokemonAPI()
    let result = pokemonAPI.show("pokemon", name)
    if (result instanceof Error) return console.log(result)
    return new Pokemon(result.name, result.height)
  }
  // Для варианта через промисы
  // static getByName2(name) {
  //   let pokemonAPI = new PokemonAPI()
  //   return pokemonAPI.show('pokemon', name).then(res => {
  //     return new Pokemon(res.name, res.height)
  //   }, err => {
  //     console.log(err)
  //   })
  // }
  static getByHeight(height) {
    return true
  }
}

class PokemonAPI {
  constructor() {
    this.url = "https://pokeapi.co/api/v2/"
  }
  async show(endpoint, name) {
    let response = await fetch(`${this.url}${endpoint}/${name}`)
    console.log(1, response)
    if (!response.ok)
      return new Error(`show request failed: ${response.status}`)
    let result = await response.json()
    console.log(2, result)
    return result
  }
  // Для варианта через промисы
  // show2(endpoint, name) {
  //   return fetch(`${this.url}${endpoint}/${name}`).then(res => {
  //     if (!response.ok) return new Error(`show request failed: ${response.status}`)
  //     return response.json()
  //   }, err => {
  //     return new Error(err)
  //   })
  // }
  pokemonNumber() {
    return Math.floor(1 + Math.random() * 893)
  }
  // как и в getbyname создать два сво-ва
  async index(endpoint, limit = "20", offset = "0") {
    let query = {
      limit: limit,
      offset: offset,
    }
    let queryString = ""
    for (k in query) {
      queryString = `${queryString}&${k}=${query[k]}`
    }
    queryString = queryString.substring(1)
    let response = await fetch(`${this.url}${endpoint}/?${queryString}`)
    console.log(1, response)
    if (!response.ok)
      return new Error(`show request failed: ${response.status}`)
    let result = await response.json()
    console.log(2, result)
    return result
  }
}

class Pokemons {
  constructor() {
    this.pokemonsList = []
  }
  getPokemons(population) {
    let pokemonAPI = new PokemonAPI()
    let num = population.peopleList.length
    for (let i = 0; i < num; i++) {
      this.pokemonsList[i] = pokemonAPI.index("pokemon", num)
    }
  }
  randomAppropriation(population) {
    for (let i = 0; i < this.pokemonsList.length; i++) {
      population.peopleList[i].pokemon = this.pokemonsList[i]
    }
  }
}

class Group {
  constructor() {
    this.copsList = []
  }
  add(cop) {
    if (!(cop instanceof Cop)) {
      return console.log(`This is not a cop!`)
    }
    if (this.copsList.includes(cop)) {
      return console.log("This cop is already in the group!")
    }
    cop.push(this.copsList)
  }
}
class Band {
  constructor() {
    this.banditsList = []
  }
  add(bandit) {
    if (!(bandit instanceof Bandit)) {
      return console.log(`This is not a bandit!`)
    }
    if (this.banditsList.includes(bandit)) {
      return console.log("This bandit is already in the band!")
    }
    bandit.push(this.banditsList)
  }
}

// создание групп для объединения людей
let group = new Group()
let band = new Band()

// группы учитывающие кол-во людей и покемонов
let population = new Population()
let pokemons = new Pokemons()

// создание стволов
let pistol = new Weapon(25, 0.6)
let shootgun = new Weapon(80, 0.4)

// создание человеков
let copAlex = new Cop("Alex", 28, 100, 450)
let copJohn = new Cop("John", 30, 100, 400)
let civilPary = new Civil("Pary", 24, 100, 150)
let civilMary = new Civil("Mary", 25, 100, 150)
let banditJorno = new Bandit("Jorno", 18, 100, 250)
let banditJotaro = new Bandit("Jotaro", 20, 100, 250)

// Корявая "регистарция"
population.add(copAlex)
population.add(copJohn)
population.add(civilMary)
population.add(civilPary)
population.add(banditJorno)
population.add(banditJotaro)

// раздать стволы
function distributeCannons() {
  population.peopleList.forEach((value) => {
    value.takeWeapon(pistol)
  })
}

// Рандомный выбор цели для стрелка
function selectTarget(population, index) {
  let res = Math.floor(1 + Math.random() * population.size())
  if (res === index) return selectTarget(population, index)
  return res // note: функция возвращает номер человека в массиве
}

// функция перестрелки
function startFirefight() {
  population.peopleList
    .filter((value) => {
      if (value.pokemon === null) {
        console.log("У ....")
        return false
      }
      return true
    })
    .forEach((value, i) => {
      for (i = 0; i < 3; i++) {
        // популяция здесь обьект !!! а не массив
        let target = selectTarget(population, i)
        value.weapon.use(target)
      }
    })
}

// pokemons.getPokemons(population);
// pokemons.randomAppropriation(population);

// distributeCannons();
// startFirefight(); // проблемы с перестрелкой - ошибка связанна с hp людей

let pkoAPI = new PokemonAPI()

pkoAPI.index("pokemon", "20", "10").then((res) => {
  copAlex.setPokemon(res)
})
