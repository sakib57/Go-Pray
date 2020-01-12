
export class AuthResponseData{
    constructor(
        public normal_user: abc
    ){}
  }

  class abc{
      constructor(
        public name: string,
        public email: string,
        public id: string,
        public picture: string
      ){}
  }