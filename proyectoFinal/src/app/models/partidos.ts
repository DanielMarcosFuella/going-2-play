export class Partidos {
    public partidoId: number;
    public torneoId: number;
    public equipo1: number;
    public equipo2: number;
    public resultado1: number;
    public resultado2: number

    constructor(partidoId: number,
    torneoId: number,
    equipo1: number,
    equipo2: number,
    resultado1: number,
    resultado2: number){
        this.partidoId = partidoId;
        this.torneoId = torneoId;
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.resultado1 = resultado1;
        this.resultado2 = resultado2
    }
}
