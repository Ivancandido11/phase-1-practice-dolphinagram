/*
    Prelim steps
    read readme
    start server
    take a look a files
    pseudo code
        Deliverables
        - Click on the heart icon to increase the dolphin image's likes, and still see them when I reload the page
        - Add a comment (no persistance needed)
*/

const dolphinName = document.querySelector("body > div > div > h2")
const dolphinImage = document.querySelector("body > div > div > img")
const dolphinLikes = document.querySelector("body > div > div > div > span")
const dolphinCommentsUl = document.querySelector("body > div > div > ul")
const existingComments = document.querySelectorAll("body > div > div > ul > li")

const addDolphinToTheDom = () => {
  fetch("http://localhost:3000/dolphins/1")
    .then(resp => resp.json())
    .then(dolphinObj => {
      dolphinName.innerHTML = dolphinObj.name
      dolphinImage.src = dolphinObj.image
      dolphinLikes.innerHTML = `${dolphinObj.likes} likes`
      existingComments.forEach(comment => {
        dolphinCommentsUl.removeChild(comment)
      })
      dolphinObj.comments.forEach(dComment => {
        const commentList = document.createElement("li")
        commentList.innerHTML = dComment.content
        dolphinCommentsUl.append(commentList)
      })
    })
}

const init = () => {
  addDolphinToTheDom()
}

document.addEventListener("DOMContentLoaded", init)
