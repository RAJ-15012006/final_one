import urllib.request
import re

tasks = [
    {
        "url": "https://chatgpt.com/share/6aa80dea-6884-83ee-8e1f-dabe53fabcd0",
        "regex": r'(# Array \\?u0026 String.*?)(?:\\",\\"role\\")',
        "file": r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\data\arrayStringMistakesData.js",
        "varName": "arrayStringMistakesMarkdown",
        "name": "Array/String"
    }
]

for task in tasks:
    try:
        print(f"Fetching {task['name']}...")
        req = urllib.request.Request(task['url'], headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # The title actually says: # Array \u0026 String Manipulation Errors — Detailed Notes
        # So we use a generic matching pattern starting at `# Array`
        match = re.search(r'(# Array.*?)(?:\\",\\"role\\")', html, re.DOTALL)
        if match:
            text = match.group(1)
            text = text.replace('\\\\n', '\n').replace('\\\"', '"').replace('\\u003c', '<').replace('\\u003e', '>')
            text = re.sub(r'.*?', '', text)
            
            raw_markdown = text.replace('`', '\\`')
            raw_markdown = raw_markdown.replace('${', '\\${')
            
            with open(task['file'], "w", encoding="utf-8") as f:
                f.write(f"export const {task['varName']} = `\n")
                f.write(raw_markdown.strip())
                f.write("\n`;\n")
            print(f"Success for {task['name']}")
        else:
            print(f"Failed to find content for {task['name']}.")
    except Exception as e:
        print(f"Error for {task['name']}: {e}")
