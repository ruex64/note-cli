import { getDB, insertDB, saveDB } from "./db.js";

export const newnote = async (note, tags) => {
    const newnote = {
        tags,
        id:Date.now(),
        content:note
    };

    await insertDB(newnote);
    return newnote;
}

export const getAllnotes = async () => {
  const {notes}  = await getDB();
  return notes
}


export const findnotes = async (search) => {
    const {notes}  = await getDB();
    return notes.filter((note) => {
        return note.content.toLowerCase().includes(search.toLowerCase())
    })
  }

  export const removenote = async (id) => {
    const {notes}  = await getDB();
   
    const noteFound = notes.find((note) => note.id === id);

    if(noteFound){
        const newnotes = notes.filter(note => note.id !== id);
        await saveDB({notes: newnotes});
        return id;
    }
  }

  export const removeAllnotes = async () => {
    await saveDB({notes:[]});
  }


