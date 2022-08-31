let tabela = document.getElementById("tabela");
function criaTag(elemento){
   return document.createElement(elemento)
}

function criaCelula(tag, text){
   tag = criaTag(tag)
   tag.textContent = text
   return tag
}

function getURL(url){
   let request = new XMLHttpRequest()
   request.open("GET", url, false)
   request.send()
   return request.responseText
}

function addLinha (cliente){
   linha = criaTag("tr");
   tdId = criaTag("td");
   tdPhone = criaTag("td");
   tdFname = criaTag("td");
   tdLname = criaTag("td");
   tdEmail = criaTag("td");

   tdId.innerHTML = cliente.id;
   tdPhone.innerHTML = cliente.phoneNumber;
   tdFname.innerHTML = cliente.firstName;
   tdLname.innerHTML = cliente.lastName;
   tdEmail.innerHTML = cliente.emailAddress;

   linha.appendChild(tdId);
   linha.appendChild(tdPhone);
   linha.appendChild(tdFname);
   linha.appendChild(tdLname);
   linha.appendChild(tdEmail);

   return linha;
}

function executa () {
   let dados = getURL("https://cors-anywhere.herokuapp.com/https://hostel-app-back-end-api.herokuapp.com/customers");
   let clientes = JSON.parse(dados);
   let tabela = document.getElementById("tabela");
   //criação da linha
   clientes.forEach(element => {
      
   });

   return clientes
}

const tamanho = executa();

const estado = {
   page: 1,
   porpage: 10,
   pagtotal: Math.ceil(23 / 10)
}

const auxiliador = {
   get(element){
      return document.querySelector(element);
   }
}

const controles = {
   prox (){
      estado.page++;

      if(estado.page > estado.pagtotal){
         estado.page--;
      }
   }, 
   anterior (){
      estado.page--;

      if(estado.page < 1){
         estado.page++;
      }
   },
   criarListas(){
      auxiliador.get(".prox").addEventListener('click', () => {
         controles.prox();
         update();
      })

      auxiliador.get(".anterior").addEventListener('click', () => {
         controles.anterior();
         update();
      })
   }
}

const lista = {
   criar(cliente){
      let tbody = criaTag("tbody")

      linha = criaTag("tr");
      tdId = criaTag("td");
      tdPhone = criaTag("td");
      tdFname = criaTag("td");
      tdLname = criaTag("td");
      tdEmail = criaTag("td");
   
      tdId.innerHTML = cliente.id;
      tdPhone.innerHTML = cliente.phoneNumber;
      tdFname.innerHTML = cliente.firstName;
      tdLname.innerHTML = cliente.lastName;
      tdEmail.innerHTML = cliente.emailAddress;
   
      linha.appendChild(tdId);
      linha.appendChild(tdPhone);
      linha.appendChild(tdFname);
      linha.appendChild(tdLname);
      linha.appendChild(tdEmail);

      linha = addLinha (cliente);
      tbody.appendChild(linha);
      auxiliador.get(".tabela").appendChild(tbody);
   },    

   update(){
      auxiliador.get(".tabela").textContent = "";

      let thead = criaTag("thead")
      
      let iTabela = ["#", "Phone Number", "First", "Last", "Email Adress"];
      let head = criaTag("tr")

      for(let i = 0; i <= iTabela.length; i++){
         let th = criaCelula("th", iTabela[i])
         head.appendChild(th)
      }
      thead.appendChild(head)
      auxiliador.get(".tabela").appendChild(thead);

      let page = estado.page - 1;
      let comeco = page * estado.porpage;
      let fim = comeco + estado.porpage;

      const itensPorPagina = tamanho.slice(comeco, fim);      
      
      itensPorPagina.forEach(lista.criar);
   }
}

function update(){
   lista.update();
}

function init (){
   lista.update();
   controles.criarListas();
   
}

init();
