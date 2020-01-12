export class MosqueModel {
    constructor(
        public result: Abc,
    ){}
}

class Abc {
    constructor(
        public name: string,
        public geometry: Xyz
    ){}
}

class Xyz {
   constructor(
        public location: Qwe
   ){}
}

class Qwe {
    constructor(
        public lat: any,
        public lng: any
    ){}
}