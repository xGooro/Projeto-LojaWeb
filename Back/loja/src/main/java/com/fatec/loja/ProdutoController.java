package com.fatec.loja;

import java.util.List;

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
public class ProdutoController {
    @Autowired
    ProdutoRepository bd;

    @GetMapping("/api/produto/{codigo}")
    public Produto carregar(@PathVariable("codigo") int c){
        if(bd.existsById(c)){
            return bd.findById(c).get();
        } else {
            return new Produto();
        }
    }
    //GET - LER POST - INSERIR, PUT - ALTERAR, DELETE- apagar
    @PostMapping("/api/produto")
    public void gravar(@RequestBody Produto obj){
        bd.save(obj);
        System.out.println("Produto gravado com sucesso!");
    }
    @PutMapping("/api/produto")
    public void alterar(@RequestBody Produto obj){
        if(bd.existsById(obj.getCodigo())){
            bd.save(obj);
            System.out.println("Produto alterado com sucesso!");
        }
    }
    @DeleteMapping("/api/produto/{codigo}")
    public void apagar(@PathVariable("codigo") int codigo){
        if(bd.existsById(codigo)){
            bd.deleteById(codigo);
            System.out.println("Produto removido com sucesso!");
        }
    }

    @GetMapping("/api/produtos")
    public List<Produto> carregarLista(){
        return bd.findAll();
    }

    @GetMapping("/api/produto/destaques")
    public List<Produto> carregarDestaques(){
        return bd.carregarDestaques();
    }

    @GetMapping("/api/produto/busca/{termo}")
    public List<Produto> fazerBusca(@PathVariable("termo") String p){
        return bd.fazerBusca("%"+ p +"%");
    }

}
