import urllib.request
import re

url = "https://chatgpt.com/share/6aa7ff6c-12a8-83e8-9c1f-6a44abbbaf46"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Grab from the specific headline down to the end of the text chunk before role:assistant
    match = re.search(r'(# Binary Search Bugs Developers Make.*?)(?:\\",\\"role\\")', html, re.DOTALL)
    if match:
        text = match.group(1)
        text = text.replace('\\\\n', '\n').replace('\\\"', '"').replace('\\u003c', '<').replace('\\u003e', '>')
        text = re.sub(r'.*?', '', text)
        
        out_file = r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\data\bsMistakesData.js"
        with open(out_file, "w", encoding="utf-8") as f:
            f.write("export const bsMistakesMarkdown = `\n")
            f.write(text.strip().replace('`', '\\`'))
            f.write("\n`;\n")
        print("Successfully extracted and wrote to BS mistakes data file.")
    else:
        print("Failed to find content.")
except Exception as e:
    print(f"Error: {e}")
