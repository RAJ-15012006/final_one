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

    # The missing closing tag for the root layout
    # The current end of the file is:
    #       </div>
    #     </div>
    #   );
    # }
    
    # We want:
    #       </div>
    #     </div>
    #     </div>
    #   );
    # }
    
    if "</div>\n    </div>\n  );\n}" not in content:
        content = content.replace("</div>\n    </div>\n  );\n}", "</div>\n    </div>\n    </div>\n  );\n}")
        content = content.replace("</div>\n      </div>\n    </div>\n  );\n}", "</div>\n      </div>\n    </div>\n    </div>\n  );\n}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed!")
