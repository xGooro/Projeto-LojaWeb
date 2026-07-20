import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // injeta o PLATFORM_ID
  const platformId = inject(PLATFORM_ID);

  //le o localStorage se estiver rodando no navegador do cliente
  if (isPlatformBrowser(platformId)) {
    const json = localStorage.getItem('Cliente');
    
    if (json) {
      const cliente = JSON.parse(json);
      
    
      if (cliente.token) {
        console.log("🛡️ Interceptor ativado! Colando o token na requisição...");
        // clona e adiciona o cabeçalho Authorization com "Bearer <token>"
        const reqClonada = req.clone({
          setHeaders: {
            Authorization: `Bearer ${cliente.token}`
          }
        });
        return next(reqClonada); // Manda a requisição clonada
      }
    }
  }

  
  return next(req);
};