import os

base_file = r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\pages\DPMistakes.jsx"
with open(base_file, 'r', encoding='utf-8') as f:
    base_content = f.read()

config = [
    {
        "file": "BSMistakes",
        "color": "#00e5ff",
        "glowText": "Teal tone for BS theme",
        "rgbaGlow": "rgba(0, 229, 255, 0.05)",
        "mdFile": "bsMistakesData",
        "mdVar": "bsMistakesMarkdown"
    },
    {
        "file": "DFSMistakes",
        "color": "#8a2be2",
        "glowText": "Purple tone for DFS theme",
        "rgbaGlow": "rgba(138, 43, 226, 0.05)",
        "mdFile": "dfsMistakesData",
        "mdVar": "dfsMistakesMarkdown"
    },
    {
        "file": "LinkedListMistakes",
        "color": "#ff4d4f",
        "glowText": "Red tone for Linked List theme",
        "rgbaGlow": "rgba(255, 77, 79, 0.05)",
        "mdFile": "linkedListMistakesData",
        "mdVar": "llMistakesMarkdown"
    },
    {
        "file": "ArrayStringMistakes",
        "color": "#ff00ff",
        "glowText": "Pink tone for Array theme",
        "rgbaGlow": "rgba(255, 0, 255, 0.05)",
        "mdFile": "arrayStringMistakesData",
        "mdVar": "arrayStringMistakesMarkdown"
    },
    {
        "file": "RecursiveMistakes",
        "color": "#00ff88",
        "glowText": "Green tone for Recursion theme",
        "rgbaGlow": "rgba(0, 255, 136, 0.05)",
        "mdFile": "recursiveMistakesData",
        "mdVar": "recursiveMistakesMarkdown"
    }
]

for c in config:
    content = base_content
    # Replacements
    content = content.replace("DPMistakes", c["file"])
    content = content.replace("#bc13fe", c["color"])
    content = content.replace("rgba(188, 19, 254, 0.05)", c["rgbaGlow"])
    content = content.replace("rgba(188,19,254,0.2)", c["rgbaGlow"].replace(', 0.05)', ', 0.2)'))
    content = content.replace("Purple tone for DP theme", c["glowText"])
    
    # Imports
    content = content.replace("import { dpMistakesMarkdown } from '../data/dpMistakesData';", f"import {{ {c['mdVar']} }} from '../data/{c['mdFile']}';")
    content = content.replace("const markdownContent = dpMistakesMarkdown;", f"const markdownContent = {c['mdVar']};")
    content = content.replace("{dpMistakesMarkdown}", f"{{{c['mdVar']}}}")

    path = rf"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\pages\{c['file']}.jsx"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Cloned successfully.")
