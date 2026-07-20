package com.fatec.loja;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    EmailService emailService;

    @Autowired
    ClienteRepository bd;

    @PostMapping("/api/email/contato")
    public void enviarContato(@RequestBody Map<String, String> dados) {
        String assunto = "Contato: " + dados.get("titulo");
        String corpo = "Nome: " + dados.get("nome") + "\n" +
                "Email: " + dados.get("email") + "\n" +
                "Telefone: " + dados.get("telefone") + "\n\n" +
                "Mensagem: " + dados.get("texto");

        emailService.enviarEmail("seu_email_da_loja@gmail.com", assunto, corpo);


        if ("true".equals(dados.get("copia"))) {
            emailService.enviarEmail(dados.get("email"), "Cópia da sua mensagem - Serious Store", corpo);
        }
    }

    @PostMapping("/api/email/recuperar")
    public String recuperarSenha(@RequestBody Map<String, String> dados) {
        Cliente cliente = bd.findByEmail(dados.get("email"));
        if (cliente != null) {
            String novaSenha = UUID.randomUUID().toString().substring(0, 8); // Gera senha aleatória
            cliente.setSenha(novaSenha);
            bd.save(cliente);

            emailService.enviarEmail(cliente.getEmail(), "Recuperação de Senha",
                    "Olá, sua nova senha é: " + novaSenha);
            return "Sucesso";
        }
        return "Erro"; // Cliente não encontrado
    }
}