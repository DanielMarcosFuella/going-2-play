import { Reglas } from "./reglas";

export class Torneo {

    constructor (public torneo_id: number,
                public nombre: string,
                public fecha: Date,
                public fases: string,
                public reglas_id: Reglas,
                public game_id: number,
                public juego: string,
                public hora: string,
                public puntos: number,
                public estado: string) {}
}

