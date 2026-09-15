import re
import glob

# The 5 remaining mistake files
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

    # If it already has TOC, skip
    if "const toc =" in content:
        continue

    # Extract dynamic values
    # 1. Component name
    comp_match = re.search(r"export default function ([A-Za-z]+)\(\)", content)
    comp_name = comp_match.group(1) if comp_match else "Unknown"
    
    # 2. Markdown variable name
    md_var_match = re.search(r"import \{ ([A-Za-z]+Markdown) \}", content)
    md_var = md_var_match.group(1) if md_var_match else "unknownMarkdown"
    
    # 3. Theme color (look for the primary color used in h1 borderBottom or glow background)
    # Using h1 element finding:
    h1_match = re.search(r"h1 style=\{\{\s*color:\s*'([^']+)'", content)
    theme_color = h1_match.group(1) if h1_match else "#ffffff"

    # We need to replace the section starting with:
    # const navigate = useNavigate();
    # return (
    
    # With our new setup block
    setup_block = f"""  const navigate = useNavigate();

  const markdownContent = {md_var};
  const THEME_COLOR = '{theme_color}';

  const toc = React.useMemo(() => {{
    const lines = markdownContent.split('\\n');
    const headings = lines.filter(line => line.startsWith('# ') || line.startsWith('## '));
    return headings.map(h => {{
        const level = h.startsWith('##') ? 2 : 1;
        // Clean markdown characters
        let text = h.replace(/^#+\\s/, '');
        text = text.replace(/[*_~`]/g, ''); 
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return {{ level, text, id }};
    }});
  }}, [markdownContent]);

  const scrollToHeading = (id) => {{
    const el = document.getElementById(id);
    if(el) {{
        // Account for some sticky margins
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({{top: y, behavior: 'smooth'}});
    }}
  }};

  const generateId = (children) => {{
    const text = Array.isArray(children) ? children.join('') : String(children);
    return text.replace(/[*_~`]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }};

  return ("""

    content = content.replace("  const navigate = useNavigate();\n\n  return (", setup_block)

    # Now replace the layout blocks
    # Original block looks like:
    #      <div style={{
    #        maxWidth: '1000px',
    #        margin: '0 auto',
    #        ...
    #      }}>
    #        <div className="markdown-container">
    #          <ReactMarkdown
    #            remarkPlugins={[remarkGfm]}
    #            components={{
    
    layout_start_match = re.search(r'(\s*<div style=\{\{\s*maxWidth: \'1000px\',\s*margin: \'0 auto\',\s*background: \'(?:[^`]+)\',\s*backdropFilter: \'blur\(20px\)\',\s*border: \'1px solid (?:[^`]+)\',\s*borderRadius: \'24px\',\s*padding: \'50px\',\s*position: \'relative\',\s*zIndex: 1,\s*boxShadow: \'(?:[^`]+)\'\s*\}\}>\s*<div className="markdown-container">\s*<ReactMarkdown\s*remarkPlugins=\{\[remarkGfm\]\}\s*components=\{\{)', content)

    if not layout_start_match:
        print(f"Layout start not matched for {comp_name}!")
        continue
    
    # We replace that with our flex container start
    flex_layout_start = f"""      <div style={{ display: 'flex', gap: '40px', maxWidth: '1400px', margin: '0 auto', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        
        {{/* LEFT SIDEBAR - TABLE OF CONTENTS */}}
        <div style={{
            position: 'sticky',
            top: '40px',
            width: '320px',
            minWidth: '320px',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${{THEME_COLOR}}44`,
            borderRadius: '24px',
            padding: '30px',
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            <Title level={{4}} style={{ color: THEME_COLOR, borderBottom: `1px solid ${{THEME_COLOR}}44`, paddingBottom: '15px', marginBottom: '20px', fontWeight: 'bold' }}>Table of Contents</Title>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {{toc.map((item, idx) => (
                    <li key={{idx}} style={{ 
                        paddingLeft: item.level === 2 ? '20px' : '0',
                        marginBottom: item.level === 1 ? '16px' : '10px',
                        cursor: 'pointer',
                        color: item.level === 1 ? '#fff' : 'rgba(255,255,255,0.6)',
                        fontSize: item.level === 2 ? '14px' : '15px',
                        fontWeight: item.level === 1 ? '600' : '400',
                        transition: 'all 0.2s ease',
                        lineHeight: '1.4'
                    }}
                    onClick={{() => scrollToHeading(item.id)}}
                    onMouseEnter={{e => {{
                        e.currentTarget.style.color = THEME_COLOR;
                        e.currentTarget.style.transform = 'translateX(5px)';
                    }}}}
                    onMouseLeave={{e => {{
                        e.currentTarget.style.color = item.level === 1 ? '#fff' : 'rgba(255,255,255,0.6)';
                        e.currentTarget.style.transform = 'translateX(0)';
                    }}}}
                    >
                        {{item.text}}
                    </li>
                ))}}
            </ul>
        </div>

        {{/* RIGHT CONTENT CONTAINER */}}
        <div style={{
            flex: 1,
            background: 'rgba(15, 10, 30, 0.7)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${{THEME_COLOR}}33`,
            borderRadius: '24px',
            padding: '50px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            minWidth: 0
        }}>
          <div className="markdown-container">
            <ReactMarkdown
              remarkPlugins={{[remarkGfm]}}
              components={{{{"""

    content = content.replace(layout_start_match.group(1), flex_layout_start)

    # Finally, modify the h1 and h2 components in the rendering tree to inject the id attribute
    # Find h1: ...
    # From: h1: ({node, ...props}) => <h1 style={{ color: '#bc13fe'...
    # To:   h1: ({node, children, ...props}) => <h1 id={generateId(children)} style={{ color: '#bc13fe'... >{children}</h1>
    
    # regex sub for h1
    content = re.sub(
        r"h1: \(\{node, \.\.\.props\}\) => <h1 style=\{\{(.+?)\}\} \{\.\.\.props\} />",
        r"h1: ({node, children, ...props}) => <h1 id={generateId(children)} style={{\1}} {...props}>{children}</h1>",
        content
    )

    # regex sub for h2
    content = re.sub(
        r"h2: \(\{node, \.\.\.props\}\) => <h2 style=\{\{(.+?)\}\} \{\.\.\.props\} />",
        r"h2: ({node, children, ...props}) => <h2 id={generateId(children)} style={{\1}} {...props}>{children}</h2>",
        content
    )
    
    # Finally, fix the missing closure `</div>` at the end
    # Original end:
    #             {__markdown__}
    #           </ReactMarkdown>
    #         </div>
    #       </div>
    #     </div>
    #   );
    # }
    # Because we added a flex wrapper around the sidebar and content, we need 4 closing divs.
    # We look for the ending and swap it.
    end_match = f"""              {{{md_var}}}
            </ReactMarkdown>
          </div>
        </div>
      </div>
  );
}}"""
    new_end_match = f"""              {{{md_var}}}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}}"""
    
    content = content.replace(end_match, new_end_match)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Processed {comp_name} successfully.")
