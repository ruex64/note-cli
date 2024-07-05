import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { findnotes, getAllnotes, newnote, removeAllnotes, removenote } from "./notes.js";
import { listnotes } from "./utils.js";


yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content to create",
      });
    },
    async (argv) => {
      const tags =  argv.tags ? argv.tags.split(',') : []

      const note = await newnote(argv.note, tags);

      console.log('New note: ', note)

    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags of the note",
  })
  .command(
    "all",
    "show all",
    () => {},
   async (argv) => {
    const notes  = await getAllnotes();
    listnotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        describe: "keyword to add filter",
      });
    },
    async (argv) => {
    const notes  = await findnotes(argv.filter);
    listnotes(notes);
    }
  )
  .command(
    "remove <id>",
    "remove by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "id of the note to remove",
      });
    },
    async (argv) => {
    const id = await removenote(argv.id);
    if(id){
        console.log('note removed: ', id)
    }else{
        console.log('note not found')

    }
    }
  )
  .command(
    "web  [port]",
    "launch website on port 5000",
    (yargs) => {
      return yargs.positional("port", {
        type: "number",
        description: "port to bind on",
        default: 5000,
      });
    },
    (argv) => {
      console.log(argv);
    }
  )
  .command(
    "clean",
    "remove all ",
    () => {},
    async (argv) => {
    await removeAllnotes();
    console.log('All notes removed');
    }
  )
  .demandCommand(1)
  .parse();
