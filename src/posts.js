import { decodeToken, isTokenValid, readToken } from './jwt.js';

const loadPosts = (url) => {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + readToken()
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then(data => {
        renderPosts(data);
    }).catch(error => {
        console.log("si è vetificato un problema durante l'operazione fetch:", error);
    });
}

const onDocumentDownload = (e, docId, postId) => {
    e.preventDefault();
    fetch(`http://localhost:8080/projectwork/resources/users/${sub}/posts/${postId}/documents/${docId}/download`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + readToken()
        },
    }).then(response => response.blob()).then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "documento";
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
}

const renderPosts = (data) => {
    const sectionEl = document.querySelector('section');
    const markup = `
        ${data.map(post => renderPost(post)).join('<hr/>')}
    `;
    sectionEl.innerHTML = markup;
    attachDownload();
}

const renderPost = (post) => {
    return `
        <div>
            <h3>${post.title}</h3>
            <p>${post.body}</p> 
            <h4>Documenti</h4>
            <ul>
                ${post.documents.map(doc => renderDocument(doc, post.id)).join('')}
            </ul>
        </div>
    `;
}

const renderDocument = (doc, postId) => {
    return `
        <li>
            <p>${doc.title}</p>
            <a href="#" data-type="download" data-doc-id="${doc.id}" data-post-id="${postId}">${doc.file}</a>
        </li>
    `;
}

const attachDownload = () => {
    const elements = document.querySelectorAll("[data-type='download']");
    elements.forEach(el => {
        el.addEventListener("click", e => onDocumentDownload(e, el.dataset.docId, el.dataset.postId));
    })
}

if (!isTokenValid()) {
    window.location.href = "login.html";
}
const { sub } = decodeToken();
loadPosts(`http://localhost:8080/projectwork/resources/users/${sub}/posts`);