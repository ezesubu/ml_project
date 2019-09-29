import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  number;
  worlds =     [
    {name: "guitarra", phonetic: "ˈsol", img: "assets/img/guitarra.webp"},
    {name: "manzana", phonetic: "mãn.ˈsa.na", img: "assets/img/manzana.jpg" }
    {name: "pera", phonetic: "ˈpɛ.ɾa", img: "assets/img/pera.jpg"},
    {name: "agua", phonetic: "ˈa.ɣwa", img: "assets/img/agua.png"},
    {name: "leon", phonetic: "ˈle.õn", img: "assets/img/leon.jpg" },
    {name: "meditación", phonetic: "me.ði.ˈta.sjõn", img: "assets/img/meditacion.png"},
    {name: "silla", phonetic: "ˈsi.ʝa", img: "assets/img/silla.png" },
    {name: "teléfono", phonetic: "te.le.ˈfo.no", img: "assets/img/telefono.png", },
    {name: "bicicleta", phonetic: "bi.si.ˈklɛ.ta", img: "assets/img/bicicleta.jpg" },
    {name: "pájaro", phonetic: "pa.ˈxa.ɾo", img: "assets/img/pajaro.jpg" },
    {name: "carro", phonetic: "ˈka.ro", img: "assets/img/car.jpg" },
    {name: "tren", phonetic: "ˈtɾɛ̃n", img: "assets/img/tren.jpg" },
    {name: "maleta", phonetic: "ma.ˈlɛ.ta", img: "assets/img/maleta.png" },
    {name: "avion", phonetic: "ˈa.βjõn", img: "assets/img/avion.png" },
    {name: "niño", phonetic: "ˈni.ɲo", img: "assets/img/niño.png" },
    {name: "niña", phonetic: "ˈni.ɲa",img: "assets/img/niña.jpg" },
    {name: "celular", phonetic: "se.lu.ˈlaɾ", img: "assets/img/celular.jpg"},
    {name: "ratón", phonetic: "ˈra.tõn", img: "assets/img/raton.png"},
    {name: "sol", phonetic: "ˈsol", img: "assets/img/sol.png"}
]
  constructor() { }
 
  getItem() {
    this.number  = Math.floor(Math.random() * this.worlds.length);
    return this.worlds[this.number];
  }
}
