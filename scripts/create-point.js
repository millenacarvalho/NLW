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
    estadoInput.value = event.target.options[indexofselectedstate] //.text tive que tirar pq deu erro e eu n entendi

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFValue}/municipios`
 
    cidadeSelect.innerHTML ="<option value>Selecione a cidade</option>"
    cidadeSelect.disabled = true

    fetch (url) //Ele vai buscar os dados da API
     .then (res => res.json()) //Tá prometendo trazer alguma coisa depois q for busccar na API
     .then ( cidades => {           //Como tem uma promessa antes, tem que ter outra pra trazer resultados pro HTML

        for (const cidade of cidades) {
            cidadeSelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
        }

        cidadeSelect.disabled = false
     })

}
 
 document
    .querySelector("select[name=UF]") /*Selecionar a barrinha de pesquisa de estados*/
    .addEventListener("change", pegueCidades) /*Fica atento 'ouvindo' um evento que vc escolher. Esse é mudança*/

    
    //Itens de coleta



const itemstocollect = document.querySelectorAll(".items-grid li")

for (const item of itemstocollect) {   //Toda a vez que clicar em algo do grid ela é executada
    item.addEventListener("click", handleselecteditem)

}

const collecteditems = document.querySelector("input[name=items")

let selecteditems = []

function handleselecteditem(event) {
    const itemli = event.target
    
    //add ou remover uma classe com JS
    itemli.classList.toggle("selected") /*O toggle serve para adicionar ou remover uma class*/

    const itemid = itemli.dataset.id

    

    //verificar se há items selecionados. Se sim, pegar os itens selecionados
    const alreadyselected = selecteditems.findIndex( item=> {
        const itemfound = item == itemid  //sera true ou false
        return itemfound
    })

    //Se já estiver selecionado, tirar da seleção.

    if (alreadyselected>=0) {
        //tirar da seleção 

        const filtereditems =selecteditems.filter(item => {
            const itemisdiferent = item != itemid
            return itemisdiferent
        })

        selecteditems = filtereditems
    } else {
        //Se não estiver selecionado, adicionar a seleção.
        selecteditems.push(itemid)

    }

    console.log(selecteditems)

    



    //Atualizar o campo escondado com os item selecionados.
    collecteditems.value = selecteditems
    
    
}


