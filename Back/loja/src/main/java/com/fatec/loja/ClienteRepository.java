package com.fatec.loja;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    // O Spring gera a query de validação de login automaticamente só de ler este nome!
    Cliente findByEmailAndSenha(String email, String senha);
    Cliente findByEmail(String email);
}
