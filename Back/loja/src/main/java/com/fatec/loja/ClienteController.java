package com.fatec.loja;


import java.util.List;
import java.util.Optional;

import com.fatec.loja.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*")
public class ClienteController {
    @Autowired
    ClienteRepository bd;
    @Autowired
    EmailService emailService;

    @Autowired
    TokenService tokenService;

    @PostMapping("/api/cliente")
    public Cliente gravar(@RequestBody Cliente obj) {
        Cliente salvo = bd.save(obj); // Salva no banco e guarda o resultado
        System.out.println("Cliente gravado com sucesso!");

        String assunto = "Bem-vindo à Serious Store! 👕";
        String corpo = "Olá " + salvo.getNome() + ",\n\n" +
                "Obrigado por se cadastrar na maior loja de camisetas nada sérias da internet!\n" +
                "Seu cadastro foi realizado com sucesso. Aproveite nossa vitrine!";

        emailService.enviarEmail(salvo.getEmail(), assunto, corpo);

        return salvo; // Devolve o cliente salvo pro Angular (agora com ID gerado!)
    }

    @PutMapping("/api/cliente")
    public Cliente alterar(@RequestBody Cliente obj) {
        Cliente salvo = bd.save(obj);
        System.out.println("Cliente alterado com sucesso!");
        return salvo;
    }

    @GetMapping("/api/cliente/{codigo}")
    public Cliente carregar(@PathVariable("codigo") int id){
        if(bd.existsById(id)){
            return bd.findById(id).get();
        } else {
            return new Cliente();
        }
    }

    @DeleteMapping("/api/cliente/{codigo}")
    public void remover(@PathVariable("codigo") int id){
        bd.deleteById(id);
        System.out.println("Cliente removido com sucesso!");
    }

    @GetMapping("/api/clientes")
    public List<Cliente> listar(){
        return bd.findAll();
    }

    @PostMapping("/api/cliente/fazerLogin")
    public Cliente fazerLogin(@RequestBody Cliente obj) {
        System.out.println("🛡️ Tentativa de Login: Email=" + obj.getEmail() + " | Senha=" + obj.getSenha());

        Cliente clienteBanco = bd.findByEmailAndSenha(obj.getEmail(), obj.getSenha());

        if(clienteBanco != null) {
            System.out.println("✅ Login bem sucedido para: " + clienteBanco.getEmail());
            String tokenGerado = tokenService.gerarToken(clienteBanco);
            clienteBanco.setToken(tokenGerado);
            return clienteBanco;
        } else {
            System.out.println("❌ Login falhou: Usuário não encontrado ou senha errada.");
            return new Cliente(); // Retorna cliente vazio
        }
    }


}
