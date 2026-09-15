import urllib.request
import re
import json

url = "https://chatgpt.com/share/6aa7fee6-5d00-83ee-a9c2-ff3a66ddc249"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # We will just look for the markdown part starting with "# Why Your Dynamic Programming Code Fails"
    # and ending before "### Sources used" or just extract all of it.
    
    # Find the big JSON structure
    match = re.search(r'window\.__REACT_QUERY_CACHE__\s*\?\?=\s*(\{.*?\});\s*</script>', html)
    if not match:
        # Fallback: just use regex directly on the HTML
        match = re.search(r'# Why Your Dynamic Programming Code Fails.*?(?=### Sources used|$)', html, re.DOTALL | re.IGNORECASE)
        if match:
            text = match.group(0)
            # unescape stuff
            text = text.replace('\\\\n', '\n').replace('\\\"', '"')
        else:
            print("Failed to find content.")
            exit(1)
    else:
        # It's better to just regex the string out of html anyways because json parsing of the massive internal string array is hard
        match2 = re.search(r'# Why Your Dynamic Programming Code Fails\s*(— Detailed Notes)?\\\\n\\\\n.*?### Sources used', html, re.DOTALL | re.IGNORECASE)
        if match2:
            text = match2.group(0)
            text = text.replace('\\\\n', '\n').replace('\\\"', '"').replace('\\u003c', '<').replace('\\u003e', '>')
            # remove ### Sources used if found
            text = text.replace('### Sources used', '')
        else:
            print("Failed to find the markdown text directly.")
            exit(1)

    # Some cleanup for citation tags like citeturn0search0turn0search7
    text = re.sub(r'.*?', '', text)

    out_file = r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\data\dpMistakesData.js"
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("export const dpMistakesMarkdown = `")
        f.write(text.strip())
        f.write("\n`;\n")
    print("Successfully extracted and wrote to DP mistakes data file.")
    
except Exception as e:
    print(f"Error: {e}")
