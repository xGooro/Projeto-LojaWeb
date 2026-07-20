import { Cliente } from './cliente';
import { Produto } from './produto';

export class ItemPedido {
    public produto: Produto = new Produto();
    public quantidade: number = 0;
    public valorUnitario: number = 0; 
    public tamanho: string = "";

}

export class Pedido {
    public codigo: number = 0;
    public cliente: Cliente = new Cliente();
    public valorTotal: number = 0;
    public itens: ItemPedido[] = [];
}