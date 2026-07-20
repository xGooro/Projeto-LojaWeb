package com.fatec.loja.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fatec.loja.Cliente;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    // assinatura d
    private String secret = "fatec_serious_store_secreta";


    public String gerarToken(Cliente cliente) {
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("LojaCamisetas")
                    .withSubject(cliente.getEmail()) // Guarda o email do cliente dentro do token
                    .withClaim("nome", cliente.getNome())
                    .withExpiresAt(dataExpiracao())
                    .sign(algoritmo);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    //verifica se o Token é verdadeiro e não expirou
    public String validarToken(String token) {
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);
            return JWT.require(algoritmo)
                    .withIssuer("LojaCamisetas")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    // Define que o token expira em 2 horas
    private Instant dataExpiracao() {
        // Usa o relógio global (UTC)
        return Instant.now().plus(2, ChronoUnit.HOURS);
    }
}