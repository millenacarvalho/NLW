 function dadosUFs () {
     const ufselect = document.querySelector("select[name=UF]")

     fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //Ele vai buscar os dados da API
     .then (res => res.json()) //Tá prometendo trazer alguma coisa depois q for busccar na API
     .then ( estados => {           //Como tem uma promessa antes, tem que ter outra pra trazer resultados pro HTML

        for (const estado of estados) {
            ufselect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
        }
     }) 
 }
 
 dadosUFs()

 function pegueCidades(event) {
    const cidadeSelect = document.querySelector("select[name=cidade]")
    const estadoInput = document.querySelector("input[name=estado]")

    const UFValue = event.target.value

    const indexofselectedstate = event.target.selectedindex
    estadoInput.value = event.target.options[indexofselectedstate].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFValue}/municipios`
 
    fetch (url) //Ele vai buscar os dados da API
     .then (res => res.json()) //Tá prometendo trazer alguma coisa depois q for busccar na API
     .then ( cidades => {           //Como tem uma promessa antes, tem que ter outra pra trazer resultados pro HTML

        for (const cidade of cidades) {
            cidadeSelect.innerHTML += `<option value="${cidade.id}">${cidade.nome}</option>`
        }

        cidadeSelect.disabled = false
     })

}
 
 document
    .querySelector("select[name=UF]") /*Selecionar a barrinha de pesquisa de estados*/
    .addEventListener("change", pegueCidades) /*Fica atento 'ouvindo' um evento que vc escolher. Esse é mudança*/