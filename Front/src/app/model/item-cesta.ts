import { Produto } from "./produto";

export class ItemCesta {
    produto: Produto = new Produto();
    quantidade: number = 1;
    valor: number = 0;
    tamanho: string = ""; 
    }