const dolphinName = document.querySelector("h2.name")
const dolphinImage = document.querySelector("img.dolphin")
const dolphinLikes = document.querySelector("span.likes")
const dolphinCommentsUl = document.querySelector("ul.comments")
const existingComments = document.querySelectorAll("ul.comments > li")
const heart = document.querySelector("button.like-button")
let likes
const commentForm = document.querySelector("form.comment-form")

const leaveAComment = () => {
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const userComment = event.target.comment.value
    const userCommentlist = document.createElement("li")
    userCommentlist.innerHTML = userComment
    dolphinCommentsUl.append(userCommentlist)
    event.target.comment.value = ""
  })
}

const likeImage = () => {
  heart.addEventListener("click", () => {
    likes = likes + 1
    console.log(likes)
    const likeData = {
      likes: likes
    }
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(likeData)
    }
    fetch("http://localhost:3000/dolphins/1", configObject)
      .then(res => res.json())
      .then(obj => {
        dolphinLikes.innerHTML = `${obj.likes} likes`
      })
  })
}

const addDolphinToTheDom = () => {
  fetch("http://localhost:3000/dolphins/1")
    .then(resp => resp.json())
    .then(dolphinObj => {
      dolphinName.innerHTML = dolphinObj.name
      dolphinImage.src = dolphinObj.image
      dolphinLikes.innerHTML = `${dolphinObj.likes} likes`
      likes = dolphinObj.likes
      likeImage()
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
  leaveAComment()
}

document.addEventListener("DOMContentLoaded", init)
