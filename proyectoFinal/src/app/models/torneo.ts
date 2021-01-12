import { Reglas } from "./reglas";

export class Torneo {

    constructor (public torneo_id: number,
                public nombre: string,
                public juego: string,
                public fecha: Date,
                public fases: string,
                public reglas_id: Reglas,
                public hora: string,
                public puntos: number,
                public resultado: boolean) {}
}

// habrá que crear una clase de fases????