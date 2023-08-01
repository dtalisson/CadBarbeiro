// function de validação cliente //
function validationForm() { 
    let nome = document.querySelector('#nome').value;
    let modelo = document.querySelector('#modelo').value;
    let cash = document.querySelector('#cash').value;
    let phone = document.querySelector('#phone').value;
    let horario = document.querySelector('#horario').value;

    if(nome == '') { 
        alert('Preencha o nome!!');
        return false
    }
    if(modelo == '') { 
        alert('Preencha o sobrenome!!')
        return false
    }
    if(cash < 1) { 
        alert('Digite o valor correto!')
        return false
    }
    if(phone < 10) { 
        alert('Digite o número correto!')
        return false
    }
    if(horario == '') { 
        alert('Digite o horário!')
        return false
    }
    return true
}
// function de mostrar cliente //
function showData() { 
    let peopleList;
    if(localStorage.getItem('peopleList') == null) { 
        peopleList = [];
    }
    else { 
        peopleList = JSON.parse(localStorage.getItem('peopleList'));

    } 

let novoHtml = ''
    peopleList.forEach(function (element, index) { 
        
       novoHtml += `
        <tr>
        <td> ${element.nome}</td>
        <td> ${element.modelo}</td>
        <td> R$${element.cash}</td>
        <td> ${element.horario} h </td>
        <td> ${element.phone}</td>

        <td class="editOptions">
        <button onclick="deleteData(${index})" class="btn btn-danger" id="del">Deletar</button>
        <button onclick="updateData(${index})" class="btn btn-warning" id="up">Editar</button>
        </td>
        </tr> `
        
    });
    document.querySelector('#crudTable tbody').innerHTML = novoHtml;
}
// load all data 
document.onload = showData();

// function adicionarCliente // 
function AddData() { 
    if(validationForm() == true) { 
        let nome = document.querySelector('#nome').value;
        let modelo = document.querySelector('#modelo').value;
        let cash = document.querySelector('#cash').value;
        let horario = document.querySelector('#horario').value
        let phone = document.querySelector('#phone').value;
    
        let peopleList;
        if(localStorage.getItem('peopleList') == null) { 
            peopleList = [];
        }
        else { 
            peopleList = JSON.parse(localStorage.getItem('peopleList'));
        } 
        
          peopleList.push({
            nome:nome,
            modelo: modelo,
            cash: cash,
            horario: horario,
            phone: phone
          });

            localStorage.setItem('peopleList', JSON.stringify(peopleList));
            showData()
            document.querySelector('#nome').value = '';
            document.querySelector('#modelo').value = '';
            document.querySelector('#cash').value = '';
            document.querySelector('#horario').value = '';
            document.querySelector('#phone').value = '';


    }
}
// function deletarCliente //
function deleteData(index) { 
    let peopleList;
    if(localStorage.getItem('peopleList') == null) { 
        peopleList = [];
    }
    else { 
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    } 

    peopleList.splice(index,1)
    localStorage.setItem('peopleList', JSON.stringify(peopleList));
    showData()
}

// function editarCliente //
function updateData(index) { 
    document.querySelector('#Submit').style.display = 'none';
    document.querySelector('#Update').style.display = 'block';

        let peopleList;

        if(localStorage.getItem('peopleList') == null) { 
            peopleList = [];
        }
        else { 
            peopleList = JSON.parse(localStorage.getItem('peopleList'));
        }
        
        document.querySelector('#nome').value = peopleList[index].nome;
        document.querySelector('#modelo').value = peopleList[index].modelo;
        document.querySelector('#cash').value = peopleList[index].cash;
        document.querySelector('#horario').value = peopleList[index].horario;
        document.querySelector('#phone').value = peopleList[index].phone;


        // function click no edit //
        document.querySelector('#Update').onclick = function () {
            if(validationForm() == true) { 
                peopleList[index].nome = document.querySelector('#nome').value;
                peopleList[index].modelo = document.querySelector('#modelo').value
                peopleList[index].cash = document.querySelector('#cash').value
                peopleList[index].horario = document.querySelector('#horario').value
                peopleList[index].phone = document.querySelector('#phone').value

                localStorage.setItem('peopleList', JSON.stringify(peopleList));
                showData()

                document.querySelector('#nome').value = '';
                document.querySelector('#modelo').value = '';
                document.querySelector('#cash').value = '';
                document.querySelector('#horario').value = '';
                document.querySelector('#phone').value = '';

                
                document.querySelector('#Submit').style.display = 'block';
                document.querySelector('#Update').style.display = 'none';
            }

            
        }
}