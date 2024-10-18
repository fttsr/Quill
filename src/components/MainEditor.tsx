import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";

export default function MainEditor() {
    const editor = useEditor({
        extensions:[StarterKit],
        content: `<h1>Welcome</h1>
                  <p>To <strong>Quill</strong>!  </p>
                  <p>This is an example of simple <i>app.</i> </p>
                  <code>body { <br/>
                   &nbsp; &nbsp; &nbsp; &nbsp;display: flex; <br/>
                   }            
                  </code> </br>
                  <p>Quite impressive, right?</p>
                  As they say,
                  <blockquote>There is always safety in numbers </br>
                  — Hamilton
                  </blockquote>`,

                  
                
    });
    return <>
     {editor ? <Menubar editor={editor} /> : null }
     <EditorContent editor={editor} />
    </>
}