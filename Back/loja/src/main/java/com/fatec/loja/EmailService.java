package com.fatec.loja;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender smtp;

    public boolean enviarEmail(String para, String assunto, String corpo) {
        SimpleMailMessage email = new SimpleMailMessage();
        try {

            email.setFrom("xGooro1@gmail.com");
            email.setTo(para);
            email.setSubject(assunto);
            email.setText(corpo);
            smtp.send(email);
            return true;
        }
        catch(Exception err) {
            System.out.println("Erro ao enviar e-mail: " + err.getMessage());
            return false;
        }
    }
}