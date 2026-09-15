import urllib.request
import re

url = "https://chatgpt.com/share/6aa80cdc-decc-83e9-a752-3eadc70f8a33"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Grab from the specific headline down to the end of the text chunk before role:assistant
    # Use a bit more generic regex just to be safe in case the title varies slightly
    match = re.search(r'(# Graph DFS Errors Beginners Make.*?)(?:\\",\\"role\\")', html, re.DOTALL)
    if match:
        text = match.group(1)
        text = text.replace('\\\\n', '\n').replace('\\\"', '"').replace('\\u003c', '<').replace('\\u003e', '>')
        text = re.sub(r'.*?', '', text)
        
        # Fixing string literals for JS
        raw_markdown = text.replace('`', '\\`')
        raw_markdown = raw_markdown.replace('${', '\\${')
        
        out_file = r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\data\dfsMistakesData.js"
        with open(out_file, "w", encoding="utf-8") as f:
            f.write("export const dfsMistakesMarkdown = `\n")
            f.write(raw_markdown.strip())
            f.write("\n`;\n")
        print("Successfully extracted and wrote to DFS mistakes data file.")
    else:
        print("Failed to find content.")
except Exception as e:
    print(f"Error: {e}")
