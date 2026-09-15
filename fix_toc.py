import sys

files = [
    r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\pages\BSMistakes.jsx",
    r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\pages\DFSMistakes.jsx",
    r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\pages\LinkedListMistakes.jsx",
    r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\pages\ArrayStringMistakes.jsx",
    r"c:\Users\Yashe\VS code projects\AI-Chatbot\leetcode-tutor-ui\src\pages\RecursiveMistakes.jsx",
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The layout wrapper div
    content = content.replace("style={ display: 'flex'", "style={{ display: 'flex'")
    content = content.replace("zIndex: 1 }>", "zIndex: 1 }}>")

    # Left Sidebar div
    content = content.replace("        <div style={\n", "        <div style={{\n")
    content = content.replace("\n        }>\n", "\n        }}>\n")
    
    # Title
    content = content.replace("style={ color: THEME_COLOR", "style={{ color: THEME_COLOR")
    content = content.replace("fontWeight: 'bold' }>", "fontWeight: 'bold' }}>")

    # ul
    content = content.replace("style={ listStyle: 'none'", "style={{ listStyle: 'none'")
    content = content.replace("margin: 0 }>", "margin: 0 }}>")

    # li
    content = content.replace("style={ \n                        paddingLeft:", "style={{ \n                        paddingLeft:")
    content = content.replace("                    }\n                    onClick={", "                    }}\n                    onClick={")

    # Right Content container
    content = content.replace("        {/* RIGHT CONTENT CONTAINER */}\n        <div style={\n", "        {/* RIGHT CONTENT CONTAINER */}\n        <div style={{\n")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed!")
