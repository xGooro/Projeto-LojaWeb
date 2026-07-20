package com.fatec.loja;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class PedidoController {


    @Autowired
    PedidoRepository bdPedido;
    @Autowired
    ItemPedidoRepository bdItem;

    @Autowired
    EmailService emailService;

    @PostMapping("/api/pedido")
    public Pedido gravar(@RequestBody Pedido obj) {

        for(ItemPedido item : obj.getItens()) {
            item.setPedido(obj);
        }
        bdPedido.save(obj);

        enviarEmailConfirmacao(obj);

        return obj;
    }

    private void enviarEmailConfirmacao(Pedido pedido) {
        String emailCliente = pedido.getCliente().getEmail();
        String assunto = "Confirmação de Pedido - Pedido #" + pedido.getCodigo();


        StringBuilder corpo = new StringBuilder();
        corpo.append("Olá, ").append(pedido.getCliente().getNome()).append("!\n\n");
        corpo.append("Recebemos o seu pedido com sucesso na Serious Store. 🎉\n\n");
        corpo.append("Resumo do pedido:\n");

        for (ItemPedido item : pedido.getItens()) {
            corpo.append("- ").append(item.getProduto().getNome())
                    .append(" | Qtd: ").append(item.getQuantidade())
                    .append(" | Tamanho: ").append(item.getTamanho())
                    .append(" | R$ ").append(item.getValorUnitario())
                    .append("\n");
        }

        corpo.append("\nValor Total: R$ ").append(pedido.getValorTotal());
        corpo.append("\n\nObrigado por comprar conosco!");

        // Dispara o e-mail
        emailService.enviarEmail(emailCliente, assunto, corpo.toString());
    }


    @GetMapping("/api/pedido/{codigo}")
    public Pedido carregar(@PathVariable("codigo") int codigo){
        Pedido p = new Pedido();
        ItemPedido i = new ItemPedido();
        p.getItens().add(i);
        return p;
    }

}
