
let articles = []
let start = 0
let end = 5
let check = false

async function fetchPosts(){
    
    try{
        /*
        let YOUR_API_KEY = "6cd5cdf73387430bbe7c021111e59a41"
        let CHANEL_CODE = "the-verge"
        const response = await fetch(`https://newsapi.org/v1/articles?source=${CHANEL_CODE}&apiKey=${YOUR_API_KEY}`, {method: 'GET',  })
        console.log(response.json());
        return*/

        const  url = 'https://api.npoint.io/b6258ca731ac6257e310'
        const request = new Request(encodeURI(url));
        const response = await fetch(request); 
        
        
       /* fetch(`https://newsapi.org/v1/articles?source=${CHANEL_CODE}&apiKey=${YOUR_API_KEY}`).then(function(response) {
        console.log(response.json());
        });*/
        if(!response.ok){
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        
        return await response.json()
    } catch(e){
        console.log(e);
    }
}

function listsPosts(Id){
    const element = document.getElementById(Id);
    
        fetchPosts().then(posts =>{  
            articles = posts.articles 
            start = 0 , end = 5    
            while (start < end) {         
                element.appendChild(postElement(start, articles));
                start += 1
            }
            end += 5
            check = false
        }).catch(e => {
            console.log(e);
        })
}


function postElement(post, articles){
    const li = document.createElement('li');
    li.setAttribute('class', "style_of_news");
    const image = document.createElement('img');
    image.setAttribute('src', `${articles[post].urlToImage}`);
    image.setAttribute('alt', "picture");
    image.setAttribute('class', "style_of_pic");
    const source = document.createElement('h2');
    source.setAttribute('class', "style_of_source");
    source.innerText = articles[post].source.name;
    const title = document.createElement('a');
    title.setAttribute('class', "style_of_link");
    title.setAttribute('href', `${articles[post].url}`);
    title.innerText = articles[post].title;
    title.setAttribute('target', '_blank');
    li.appendChild(image);
    li.appendChild(source);
    li.appendChild(title);
    /*const item = `<li class="style_of_news">
                    <img src =${post.urlToImage} atl ="picture" class="style_of_pic">
                    <h2 class="style_of_source">${post.author}</h2>
                    <h2><a class="style_of_link"  href=${post.url}>${post.description}</a></h2>
                </li>`*/
    return li
}

function load_more(){
    stop_reload()
    if(check)
        return
    const element = document.getElementById('news-container');
    while (start < end  && start < 40 && start < articles.length) {         
        element.appendChild(postElement(start, articles));
        start += 1
    }
    end += 5
}

function search(){
    stop_reload()
    input = document.getElementById("myInput");
    const res = document.getElementById("res-state");
    const element = document.getElementById('news-container');
    let search = input.value
    check = false
    element.replaceChildren()
    if(search == ""){  
        res.innerHTML = "";
        listsPosts('news-container')
        return
    }
    for (key in articles) {  
        my_title =  articles[key].title    
        if (my_title.match(search)) {
            element.appendChild(postElement(key, articles));
            check = true
        }
        
    }
    if(!check){
        res.innerHTML = "There are no articles matching your request.";
    }else{
        res.innerHTML = "";
    }
}

function filter(){
    stop_reload()
    const input = document.getElementById("Filter");
    const res = document.getElementById("res-state");
    const element = document.getElementById('news-container');
    let my_filter = input.value
    check = false
    element.replaceChildren()
    if(my_filter == ""){  
        res.innerHTML = "";
        listsPosts('news-container')
        return
    }
    for (key in articles) {      
        my_source =  articles[key].source.name
        if (my_source == my_filter) {
            element.appendChild(postElement(key, articles));
            check = true
        }
        
    }
    if(!check){
        res.innerHTML = "There are no articles matching your request.";
    }else{
        res.innerHTML = "";
    }

}
function stop_reload(){
    const form = document.getElementById("myForm");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
}