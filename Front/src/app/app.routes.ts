import { Routes } from '@angular/router';
import { Contato } from './contato/contato';
import { Vitrine } from './vitrine/vitrine';
import { Cesta } from './cesta/cesta';
import { Detalhe } from './detalhe/detalhe';
import { Cadastro } from './cadastro/cadastro';
import { Login } from './login/login';
import { Recupera } from './recupera/recupera';
import { Home } from './home/home';
import { Pesquisa } from './pesquisar/pesquisar';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contato', component: Contato },
  { path: 'vitrine', component: Vitrine },
  { path: 'cesta', component: Cesta },
  { path: 'detalhe', component: Detalhe },
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login },
  { path: 'recupera', component: Recupera },
  { path: 'pesquisar', component: Pesquisa },
];
