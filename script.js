const addbtn = document.getElementById("add")

const notes = JSON.parse(localStorage.getItem("notes"))
console.log(notes)

if (notes) {
    notes.forEach(note => addnewnote(note));
}

addbtn.addEventListener("click", () => addnewnote())
function addnewnote(text = "") {
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML =
        `<div class="tools">
            <button class="edit"><i class="fas fa-edit" ></i></button>
            <button class="delete"><i class="fas fa-trash-alt" ></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}" ></textarea>`

    const editbtn = note.querySelector(".edit")
    const deletebtn = note.querySelector(".delete")
    const main = note.querySelector(".main")
    const textarea = note.querySelector("textarea")

    textarea.value = text
    main.innerHTML = marked(text)

    deletebtn.addEventListener("click", () => {
        note.remove()
        updatels()
    })
    editbtn.addEventListener("click", () => {
        main.classList.toggle("hidden")
        textarea.classList.toggle("hidden")
    })
    textarea.addEventListener("input", (e) => {
        const { value } = e.target
        main.innerHTML = marked(value)
        updatels()
    })

    document.body.appendChild(note)
}

function updatels() {
    const notestext = document.querySelectorAll("textarea")
    const notes = []
    notestext.forEach(note => notes.push(note.value))
    localStorage.setItem("notes", JSON.stringify(notes))
    console.log(notes)
}