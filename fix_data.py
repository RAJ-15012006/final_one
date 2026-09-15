import os
import re

def fix_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if the file uses backticks
    if "export const" in content and "`" in content.split("=", 1)[1]:
        # Extract the pure string
        var_def, val = content.split("=", 1)
        # the text is between the first ` and the last `
        start = val.find("`")
        end = val.rfind("`")
        if start != -1 and end != -1:
            raw_markdown = val[start+1:end]
            # fix backticks inside the text
            raw_markdown = raw_markdown.replace('\\`', '`') # undo any partial previous attempts
            raw_markdown = raw_markdown.replace('`', '\\`')
            # fix string interpolation sequences
            raw_markdown = raw_markdown.replace('${', '\\${')
            
            new_content = var_def + "= `\n" + raw_markdown + "\n`;\n"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {filepath}")


fix_file(r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\data\dpMistakesData.js")
fix_file(r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\data\bsMistakesData.js")
