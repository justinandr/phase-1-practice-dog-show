document.addEventListener('DOMContentLoaded', () => {
    renderList()
    document.getElementById('dog-form').addEventListener('submit', editEntry)
})

function renderList(){
    document.getElementById('table-body').innerHTML = ''
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            const tr = document.createElement('tr')
            const name = document.createElement('td')
            const breed = document.createElement('td')
            const sex = document.createElement('td')
            const edit = document.createElement('td')
            const button = document.createElement('button')

            name.textContent = element.name
            name.id = element.id
            breed.textContent = element.breed
            sex.textContent = element.sex
            button.textContent = 'Edit'
            edit.appendChild(button)
            button.addEventListener('click', handleEdit)

            tr.append(name, breed, sex, edit)
            document.getElementById('table-body').appendChild(tr)

        })
    })
}

function handleEdit(e){
    const sex = e.target.parentNode.previousSibling
    const breed = sex.previousSibling
    const name = breed.previousSibling

    document.getElementById('dog-form').children[0].value = name.textContent
    document.getElementById('dog-form').children[0].id = name.id
    document.getElementById('dog-form').children[1].value = breed.textContent
    document.getElementById('dog-form').children[2].value = sex.textContent
}

function editEntry(e){
    e.preventDefault()
    const obj = {}
    obj.name = e.target[0].value
    obj.breed = e.target[1].value
    obj.sex = e.target[2].value

    fetch(`http://localhost:3000/dogs/${e.target[0].id}`, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(renderList)
}