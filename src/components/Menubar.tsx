import { Editor } from "@tiptap/react";
import { useState, useEffect } from "react";

interface IMenubarProp {
    editor: Editor;
}

export default function Menubar({ editor }: IMenubarProp) {
    const getFocus = () => editor.chain().focus();

    const isActive = (type: string, options?: any) => {
        return editor.isActive(type, options ?? {}) ? 'is-active' : '';
    };

    // Состояние отслеживания активных кнопок
    const [activeStates, setActiveStates] = useState(() => ({
        bold: isActive('bold'),
        italic: isActive('italic'),
        strikethrough: isActive('strike'),
        code: isActive('code'),
        heading1: isActive('heading', {level: 1}),
        heading2: isActive('heading', {level: 2}),
        bulletList: isActive('bulletList'),
        orderedList: isActive('orderedList'),
        codeBlock: isActive('codeBlock'),
        blockquote: isActive('blockquote'),

    }));

    useEffect(() => {
        const handleUpdate = () => {
            setActiveStates({
                bold: isActive('bold'),
                italic: isActive('italic'),
                strikethrough: isActive('strike'),
                code: isActive('code'),
                heading1: isActive('heading', {level: 1}),
                heading2: isActive('heading', {level: 2}),
                bulletList: isActive('bulletList'),
                orderedList: isActive('orderedList'),
                codeBlock: isActive('codeBlock'),
                blockquote: isActive('blockquote'),
            });
        };

        editor.on('transaction', handleUpdate);

        return () => {
            editor.off('transaction', handleUpdate);
        };
    }, [editor]);
    

    const menus = [
        [
            { icon: 'bold', onClick: () => getFocus().toggleBold().run(), isActive: activeStates.bold, title: 'Ctrl + B'  },
            { icon: 'italic', onClick: () => getFocus().toggleItalic().run(), isActive: activeStates.italic, title: 'Ctrl + I' },
            { icon: 'strikethrough', onClick: () => getFocus().toggleStrike().run(), isActive: activeStates.strikethrough, title: 'Ctrl + K' },
            { icon: 'code-line', onClick: () => getFocus().toggleCode().run(), isActive: activeStates.code, title: 'Ctrl + D' },
        ],
        [
            { icon: 'h-1', onClick: () => getFocus().toggleHeading({ level: 1 }).run(), isActive: activeStates.heading1, title: 'Ctrl + 1' },
            { icon: 'h-2', onClick: () => getFocus().toggleHeading({ level: 2 }).run(), isActive: activeStates.heading2, title: 'Ctrl + 2' },
            { icon: 'list-unordered', onClick: () => getFocus().toggleBulletList().run(), isActive: activeStates.bulletList, title: 'Ctrl + Shift + U' },
            { icon: 'list-ordered', onClick: () => getFocus().toggleOrderedList().run(), isActive: activeStates.orderedList, title: 'Ctrl + Shift + O' },
            { icon: 'code-box-line', onClick: () => getFocus().toggleCodeBlock().run(), isActive: activeStates.codeBlock, title: 'Ctrl + Alt + C' },
        ],
        [
            { icon: 'double-quotes-l', onClick: () => getFocus().toggleBlockquote().run(), isActive: activeStates.blockquote, title: 'Ctrl + Q' },
            { icon: 'separator', onClick: () => getFocus().setHorizontalRule().run(), title: 'Сделать абзац' }
        ],
    ];
    
    // Нестандартные хоткеи
    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.ctrlKey && (event.key === 'K' || event.key === 'л' || event.key === 'k' || event.key === 'Л' )) {
                event.preventDefault();
                getFocus().toggleStrike().run();
            }
            if (event.ctrlKey && (event.key === 'D' || event.key === 'd' || event.key === 'в' || event.key === 'В')) {
                event.preventDefault();
                getFocus().toggleCode().run();
            }
            if (event.ctrlKey && event.key === '1') {
                event.preventDefault();
                getFocus().toggleHeading({level: 1}).run();
            } 
            if (event.ctrlKey && event.key === '2') {
                event.preventDefault();
                getFocus().toggleHeading({level: 2}).run();
            } 
            if (event.ctrlKey && event.shiftKey && (event.key === 'U' || event.key === 'u' || event.key === 'Г' || event.key === 'г')) {
                event.preventDefault();
                getFocus().toggleBulletList().run();
            }
            if (event.ctrlKey && event.shiftKey && (event.key === 'O' || event.key === 'o' || event.key === 'Щ' || event.key === 'щ')) {
                event.preventDefault();
                getFocus().toggleOrderedList().run();
            }
            if (event.ctrlKey && event.shiftKey &&  (event.key === 'C' || event.key === 'c')) {
                event.preventDefault();
                getFocus().toggleCodeBlock().run();
            }
            if (event.ctrlKey && (event.key === 'q' || event.key === 'Q' || event.key === 'й' || event.key === 'Й   ')) {
                event.preventDefault();
                getFocus().toggleBlockquote().run();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

return (
        <div className="menu">            
            {menus.map((group, index) => (
                <div className='group-item' key={index}>
                    {group.map((item) => (
                        <button className={`menu-item ${item.isActive ? 'is-active' : ''}`} 
                                key={item.icon} onClick={item.onClick} title={item.title}>
                                <i className={`ri-${item.icon}`}></i>
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}