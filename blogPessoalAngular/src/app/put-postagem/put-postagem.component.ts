import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';
import { PostagemService } from '../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertaService } from './../service/alerta.service';

@Component({
  selector: 'app-put-postagem',
  templateUrl: './put-postagem.component.html',
  styleUrls: ['./put-postagem.component.css']
})
export class PutPostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number  

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alerta: AlertaService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    
    this.idPostagem = this.route.snapshot.params["id"]
    this.findByIdPostagem(this.idPostagem)

    
    this.findAllTemas()
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  salvar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.router.navigate(['/feed'])
      this.alerta.showAlertSuccess('Postagem alterada com sucesso')
    }, err => {
      if (err.status == '500'){
        this.alerta.showAlertDanger('Preencha todos os campos corretamente antes de enviar!')
      }
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

 findByIdTema() {
   this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
     this.tema = resp;
   })
 }

}