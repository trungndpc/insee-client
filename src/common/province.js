const data = window["data-provinces"]
const optionsCity = []

function buildCityOptions(cities) {
    for (const key in cities) {
        if (cities[key].status !== 0) {
            optionsCity.push({ value: key, label: cities[key].name })
        }
    }
}

buildCityOptions(data)

export class City {

    constructor(id) {
        for (const key in data) {
            if (id === Number(key)) {
                this.value = data[key];
            }
        }
    }

    isValid() {
        return (this.value != null && this.value !== undefined)
    }

    getName() {
        return this.value.name;
    }

    getId() {
        return this.value.id;
    }

    getDistrict(id) {
        let districts = this.value.districts;
        for (const district of districts) {
            if (district.id === id) {
                return new District(district);
            }
        }
    }

    getDistrictOptions() {
        let options = []
        let districts = this.value.districts;

        for (const district of districts) {
            options.push({ value: district.id, label: district.name });
        }
        return options;
    }

    static getOptions() {
        return optionsCity;
    }
}

export class District {

    constructor(value) {
        this.value = value;
    }

    getId() {
        return this.value.id;
    }

    getName() {
        return this.value.name;
    }
}


