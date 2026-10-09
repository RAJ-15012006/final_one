from fpdf import FPDF

pdf = FPDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
pdf.set_font("Arial", "B", 24)
pdf.cell(200, 20, "AI/ML Interview Guide (RAJ PDF)", ln=True, align='C')

pdf.set_font("Arial", "", 12)

content = [
    ("Chapter 1: Introduction to Machine Learning", "Machine learning is a subset of AI that focuses on building systems that learn from data..."),
    ("Supervised vs Unsupervised", "Supervised learning uses labeled data. Unsupervised learning finds hidden patterns..."),
    ("Chapter 2: Deep Learning", "Deep learning utilizes neural networks with many layers (deep neural networks)..."),
    ("Activation Functions", "ReLU, Sigmoid, and Tanh are common activation functions. ReLU is mostly used in hidden layers..."),
    ("Chapter 3: NLP", "Natural Language Processing deals with text and speech..."),
    ("Transformers", "The Transformer architecture relies on self-attention mechanisms..."),
    ("Chapter 4: Computer Vision", "CNNs (Convolutional Neural Networks) are the standard for image processing..."),
    ("Overfitting", "Overfitting occurs when a model learns the training data too well, including noise..."),
    ("Regularization", "L1 (Lasso) and L2 (Ridge) regularization help prevent overfitting..."),
    ("Evaluation Metrics", "Accuracy, Precision, Recall, and F1-Score are key metrics for classification..."),
]

for title, body in content:
    for _ in range(2): # Repeat to add pages
        pdf.set_font("Arial", "B", 16)
        pdf.cell(200, 10, title, ln=True)
        pdf.set_font("Arial", "", 12)
        pdf.multi_cell(0, 10, body * 30) 
        pdf.add_page()

pdf.output("public/RAJ.pdf")
print("PDF generated!")
