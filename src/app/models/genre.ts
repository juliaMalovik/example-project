export class Genre {
    public id: number;
    public name: string;
    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
    }
}
