export class NearbyMosque {
    constructor(
        public status: number,
        public mosques: Abc
    ){}
}

class Abc{
        public 0: Def
}
 class Def{
     constructor(
        public additional_image: string,
        public address: string,
        public id: number,
        public location: string,
        public main_image: string,
        public name: string,
        public distance_meter: number
     ){}
 }