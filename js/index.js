let urlBookList = 'http://localhost:3000/books'
let urlLikes = 'http://localhost:3000/users'

document.addEventListener("DOMContentLoaded", function() {
    fetchList()

});

function fetchList(){
    fetch(urlBookList)
        .then(resp => resp.json())
        .then(data => data.forEach(element => renderBooks(element)))
}

function renderBooks(element){
    let ul = document.querySelector('#list');
    let div = document.querySelector('#show-panel')
    let li = document.createElement('li')
    li.innerText = element.title


    li.addEventListener('click', e => {
        console.log(element)
        let img = document.createElement('img')
        img.setAttribute('src', `${element.img_url}`)
        let h2 = document.createElement('h2')
        h2.innerText = element.title
        let h2b = document.createElement('h2b')
        h2b.innerText = element.author
        let p = document.createElement('p')
        p.innerText = element.description 
        let btn = document.createElement('button')
        btn.innerText = 'LIKE' 
        btn.addEventListener('click', e => {
            patchLike(element)
        })
        
        let ulLiked = document.createElement('ul')

        element.users.forEach(name => {
            liUsers = document.createElement('li')
            liUsers.innerText = name.username
            ulLiked.append(liUsers)
        })

        div.append(img, h2, h2b, p, ulLiked, btn)
    })

    ul.appendChild(li)
}

function patchLike(element){
    likeObj = (element.users)
    currentUser = {"id":1, "username":"pouros"}
    likeObj.push(currentUser)
    //console.log(likeObj)
    fetch(`${urlBookList}/${element.id}`, {
        method : 'PATCH',
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            id: element.id,
            users: likeObj
        })
    })
    .then(resp => resp.json())
    .then(data => refreshPage(data))
}

function refreshPage(data){
    console.log(data)
    fetch(urlBookList)
        .then(resp => resp.json())
        .then(data => {
            let div = document.querySelector('#show-panel')
            div.innerHTML = ''
            let ul = document.querySelector('#list');
            ul.innerHTML = ''


            data.forEach(element => {renderBooks(element)})
            
        })
}

    