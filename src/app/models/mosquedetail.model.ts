export class MosqueDetail{
    constructor(
        public mosque_details: Abc,
        public jummah_time: string,
        public prayer_times: Def,
        public additional_images: Img,
        public committee_members: Com
    ){}
}


class Abc{
    constructor(
        public description: string,
        public location: string,
        public main_image: string,
        public name: string,
        public id: number,
        public phone: number,
        public facebook: string,
        public email: string,
        public website: string,
        public facilities: string,
        public latitude: number,
        public longitude: number,
        
    ){}
}

class Def{
    public 0: fjr
    public 1: zhr
    public 2: asr
    public 3: mgrb
    public 4: isha
}

class fjr{
    constructor(
        public time: string
    ){}
}
class zhr{
    constructor(
        public time: string
    ){}
}
class asr{
    constructor(
        public time: string
    ){}
}
class mgrb{
    constructor(
        public time: string
    ){}
}
class isha{
    constructor(
        public time: string
    ){}
}

class Img{

}

class Com{
    
}
