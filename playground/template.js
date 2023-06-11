class individual {
    get fitness() {
        if (this.genotype == "dd") return drive_fitness;
        if (this.genotype == "d+" || this.genotype == "dr" || this.genotype == "dR") return Math.sqrt(drive_fitness);
        return 1.0;
    }
    constructor(sex, age, genotype) {
        this.sex = sex;
        this.age = age;
        this.genotype = genotype;
    }
    gamate_generation() {
        // drive event
        if (this.genotype == "d+") {
            if (drive_efficiency >= Math.random()) {
                return ["d", "d"];
            } else if (resistance_2_formation_rate_if_not_converted >= Math.random()) {
                return ["d", "r"];
            } else if (resistance_1_formation_rate_if_not_resistance_2 >= Math.random()) {
                return ["d", "R"];
            } else return ["d", "+"];
        }
        return ind.genotype.split('');
    }
};

class population {
    constructor() {
        this.male = [];
        this.female = [];
        this.population_size = 0;
    }
    get population_size() {
        this.population_size = population.male.length + population.female.length;
        return this.population_size;
    }
    initialize_population() {
        for (var i = 1; i <= capacity / 2; i++) {
            population.male.push(new individual("male", 0, "++"));
            population.female.push(new individual("female", 0, "++"));
        }
    }
    add_individual(ind) {
        if (ind.sex == "male") {
            this.male.append(ind);
        } else if (ind.sex == "female") {
            this.female.append(ind);
        }
        get_population_size();
    }
    age_increase() {
        for (var i in population.male) {
            population.male[i].age++;
        }
        for (var i in population.female) {
            population.female[i].age++;
        }
    }
    age_based_death_discrete() {
        for (var i = population.male.length - 1; i >= 0; i--) {
            if (population.male[i].age > 0) {
                population.male.splice(i, 1);
            }
        }
        for (var i = population.female.length - 1; i >= 0; i--) {
            if (population.female[i].age > 0) {
                population.female.splice(i, 1);
            }
        }
    }
};

class simulation {
    constructor(capacity, release_ratio, low_density_growth_rate, drive_efficiency, r2, r1, drive_fitness, max_attempts, egg, max_cyc) {
        // Definition of "population":
        // population = { male: [], female: [] };
        // The subarray are filled with "individual"s
        this.population = new population();
        this.cycle = 0; // generation
        this.capacity = capacity; // default 2500
        this.release_size = capacity * release_ratio; // default 2500
        this.low_density_growth_rate = low_density_growth_rate; // default 6.0
        this.drive_efficiency = drive_efficiency; // default 0.85
        this.resistance_2_formation_rate_if_not_converted = r2; // if not converted; default 0.5
        this.resistance_1_formation_rate_if_not_resistance_2 = r1; // if not to r2; default 0.01
        this.drive_fitness = drive_fitness; // default 0.9
        this.max_attempts_to_find_a_mate = max_attempts; // default 10
        this.egg_num_per_female = egg; // default 50
        this.max_generations = max_cyc; // default 100
    }

};